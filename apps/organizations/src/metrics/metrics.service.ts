import { Injectable, OnModuleInit } from '@nestjs/common';
import { Registry, Counter, Histogram, collectDefaultMetrics,} from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {

    private readonly registry: Registry;
    private readonly httpRequestTotal: Counter;
    private readonly httpRequestDuration: Histogram;

    constructor() {
        this.registry = new Registry();
        this.httpRequestTotal = new Counter({
            name: 'http_request_total',
            help: 'Total de number of HTTP requests.',
            labelNames: ['method','route','status_code'],
            registers: [this.registry]
        });
        this.httpRequestDuration = new Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds.',
            labelNames: ['method','route','status_code'],
            buckets: [0.005,0.01,0.025,0.05,0.1,0.25,0.5,1,2,5,5,10],
            registers: [this.registry]
        });
    }

    onModuleInit() {
        collectDefaultMetrics({
            register: this.registry,
            prefix: 'users_service_'
        });
    }

    async getMetrics() {
        return this.registry.metrics();
    }

    getContentType(): string {
        return this.registry.contentType;
    }
}
