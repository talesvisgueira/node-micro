import { Injectable, Logger } from "@nestjs/common";
import { CircuitBreakerOptions, CircuitBreakerState, CircuitBreakStateEnum } from './circuit-break.interface';
import { serviceConfig } from '../config/gateway.config';
 

@Injectable()
export class CircuitBreakerService {

    private readonly logger = new Logger('CircuitBreaker');
    private readonly circuits = new Map<string,CircuitBreakerState>();
    private readonly defaultOptions: CircuitBreakerOptions = {
        failureThreshold: 5,
        timeout: 60000,
        resetTimeout: 30000,
    }


    async executeWithCircuitBreak<T>(
        operation: () => Promise<T>,
        fallback?: () => Promise<T>,
        key?: string,
        options: CircuitBreakerOptions = this.defaultOptions,
    ): Promise<T> {

        const config = { ...this.defaultOptions, ...options, }
        const circuit = this.getOrCreateCircuit(key!, config);

        if (circuit.state === CircuitBreakStateEnum.OPEN) {
            if (Date.now() < circuit.nextAttemptTime) {
                this.logger.warn(`Circuit breaker OPEN for ${key}, using fallback.`);
                if (fallback) return await fallback();
            }
            throw new Error('Circuit breaker OPEN.')
        } else {
            circuit.state = CircuitBreakStateEnum.HALF_OPEN ;
            this.logger.warn(`Circuit break HALF_OPEN for ${key}, using fallback.`)
        }

        try {
            const result = await operation();
            this.onSuccess(circuit, key!);
            return result;
        } catch (error) {
            this.onFailure(circuit, key!, config);
            this.logger.error(`Circuit breaker failure for ${key}: `);
            if (fallback) {
                this.logger.log(`Using fallback for ${key}`)
                return await fallback();
            }
            throw error;
        }

    }

    private onSuccess(circuit: CircuitBreakerState, key: string): void {
        circuit.failureCount = 0;
        circuit.state = CircuitBreakStateEnum.COLSED;
        this.logger.error(`Circuit breaker SUCCESS for ${key}, state COLSED.` );
    }

    private onFailure(circuit: CircuitBreakerState, key: string, options: CircuitBreakerOptions): void {
        circuit.failureCount++;
        circuit.lastFailureTime = Date.now();
        if (circuit.failureCount >= options.failureThreshold) {
            circuit.state = CircuitBreakStateEnum.OPEN;
            circuit.nextAttemptTime = Date.now() + options.resetTimeout;
            this.logger.warn(`Circuit breaker OENED for ${key} after ${circuit.failureCount} failures`);
        }
    }

    private getCircuitState(key: string): CircuitBreakerState | undefined {
        return this.circuits.get(key);
    }

    private getAllCircuits(): Map<string,CircuitBreakerState> {
        return new Map(this.circuits);
    }

    private resetCircuit(key: string) {
        this.circuits.delete(key);
        this.logger.log(`Circuit break RESET for ${key}`)

    }

    private getOrCreateCircuit(key: string, options: CircuitBreakerOptions): CircuitBreakerState {
        if (!this.circuits.has(key)) {
            this.circuits.set(key, {
                state: CircuitBreakStateEnum.COLSED,
                failureCount:0,
                lastFailureTime: 0,
                nextAttemptTime: Date.now() + options.timeout,
            })
        }
        return this.circuits.get(key)!;
    }
}
