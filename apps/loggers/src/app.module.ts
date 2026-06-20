
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerQueueService } from './logger.service';
import { LoggerConsumerService } from './logger.consume';
import { MetricsModule } from './metrics/metrics.module';
import { AuditModule } from './audit/audit.module';
import { AuditService } from './audit/audit.service';
import { AuditController } from './audit/audit.controller';

import { EventMessageModule } from '@myorg/events/dist/event.module';
@Module({
  imports: [
    AuditModule,
    MetricsModule,
    EventMessageModule,],
  controllers: [AppController, AuditController],
  providers: [AppService,
    LoggerConsumerService,
    LoggerQueueService,
    AuditService
  ],
})
export class AppModule {}
