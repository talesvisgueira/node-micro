import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventMessageModule } from '@myorg/eventer/src/event.module';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [ConfigModule,
    TypeOrmModule.forRoot(databaseConfig),
    EventMessageModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
