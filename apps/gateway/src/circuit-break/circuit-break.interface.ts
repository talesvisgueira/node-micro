export enum CircuitBreakStateEnum {
    COLSED = 'CLOSED',
    OPEN = 'OPEN',
    HALF_OPEN = 'HALF_OPEN'
}

export interface CircuitBreakerOptions {
    failureThreshold: number,
    timeout: number,
    resetTimeout: number;
}

export interface CircuitBreakerState {
    state: CircuitBreakStateEnum;
    failureCount: number;
    lastFailureTime: number;
    nextAttemptTime: number;
}

export interface CircuitBreakerResult<T> {
    success: boolean;
    data?: T;
    error: Error;
    fromCache?: boolean;
}