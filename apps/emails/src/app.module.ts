import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from '@myorg/core/dist/metrics/metrics.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
