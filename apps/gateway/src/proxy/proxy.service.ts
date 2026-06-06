import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { serviceConfig } from '../config/gateway.config';
import { firstValueFrom } from 'rxjs';
import { CircuitBreakerModule } from '../circuit-break/circuit-break.module';
import { CircuitBreakerService } from '../circuit-break/circuit-break.service';

interface UserInfo {
    userId: string;
    email: string;
    role: string;
}
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

@Injectable()
export class ProxyService {

    private readonly logger = new Logger(ProxyService.name);

    constructor(private readonly httpService: HttpService,
                private readonly circuitBreakerService: CircuitBreakerService) {}

    async proxyRequest(
        serviceName: keyof typeof serviceConfig,
        method: string,
        path: string,
        data?: unknown,
        Headers?: Record<string,string>,
        userInfo?: UserInfo,
    ) {
        const service = serviceConfig[serviceName];
        const url = `${service.url}${path}`;

        this.logger.log(`Proxying request to ${url} with method ${method}`);

        return this.circuitBreakerService.executeWithCircuitBreak(
            `proxy-${serviceName}`,
            async () => {
                const enhancedHeaders = {
                    ...Headers,
                    'X-User-Info': JSON.stringify(userInfo),
                };
                const response = await firstValueFrom (
                    this.httpService.request({
                        method: method.toLowerCase() as HttpMethod,
                        url,
                        data,
                        headers: enhancedHeaders,
                        timeout: service.timeout,
                    })
                )
                return response;
            },
            async () => {
                this.logger.error(`Error proxying ${method} request to ${serviceName}: ${url}`,);
                throw new Error(`${serviceName} service is temporarily unavailable`);
            },
            { failureThreshold: 3, timeout: 30000, resetTimeout: 30000 }
        );

    }

    async getServiceHealth(serviceName: keyof typeof serviceConfig) {
        try {
            const service = serviceConfig[serviceName];
            const response = await firstValueFrom(
                this.httpService.get(`${service.url}/health`, {timeout: 3000,})
            );
            return { status: 'healthy', details: response.data };
        } catch (error :any) {
            this.logger.error(`Error checking service health: ${error.message}`);
            return { status: 'unhealthy', error: error.message };
        }
    }

}
