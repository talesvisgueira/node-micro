import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { serviceConfig } from '../config/gateway.config';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ProxyService {

    private readonly logger = new Logger(ProxyService.name);

    constructor(private httpService: HttpService) {}

    async proxyRequest(
        serviceName: keyof typeof serviceConfig,
        method: string,
        path: string,
        data?: any,
        Headers?: any,
        userInfo?: any,
    ) {
        const service = serviceConfig[serviceName];
        const url = `${service.url}${path}`;

        this.logger.log(`Proxying request to ${url} with method ${method}`);
        try {
            const enhancedHeaders = {
                ...Headers,
                'X-User-Info': JSON.stringify(userInfo),
            };
            const response = await firstValueFrom (
                this.httpService.request({
                    method: method.toLowerCase() as any,
                    url,
                    data,
                    headers: enhancedHeaders,
                    timeout: service.timeout,
                })
            )
        } catch (error) {
            this.logger.error(`Error proxying ${method} request to ${serviceName}: ${url}`,
            );
            throw error;
        }
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
