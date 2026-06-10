import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventMessageModule } from '@myorg/eventer/dist/src/event.module'
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [ConfigModule, EventMessageModule,MetricsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
