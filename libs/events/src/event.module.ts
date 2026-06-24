import { Module } from '@nestjs/common';
import { EventMessageService } from './event.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EventMessageService,ConfigService],
  exports: [EventMessageService]
})
export class EventMessageModule {}
