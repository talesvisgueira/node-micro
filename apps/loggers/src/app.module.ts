import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventMessageModule } from '@myorg/eventer/dist/src/event.module'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { LoggerQueueService } from './logger.service';
import { LoggerConsumerService } from './logger.consume';

@Module({
  imports: [ConfigModule,
    TypeOrmModule.forRoot(databaseConfig),
    EventMessageModule,],
  controllers: [AppController],
  providers: [AppService,
    LoggerConsumerService,
    LoggerQueueService
  ],
})
export class AppModule {}
