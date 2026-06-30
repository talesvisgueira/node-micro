import { EventMessageModule } from '@myorg/events/dist/event.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from '@myorg/core/dist/metrics/metrics.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ConfigModule,
     JwtModule,
     EventMessageModule,
     MetricsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
