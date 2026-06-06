import { Module } from '@nestjs/common';
import { CircuitBreakerService } from './circuit-break.service';

@Module({
    imports: [],
    controllers: [],
    providers: [CircuitBreakerService],
    exports: [CircuitBreakerService],
})

export class CircuitBreakerModule {}