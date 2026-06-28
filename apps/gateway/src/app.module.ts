import {  Module, NestModule } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProxyModule } from './proxy/proxy.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AuthModule } from './controllers/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './guards/throttler.guard';
import { MetricsController } from './metrics/metrics.controller';
import { MetricsService } from './metrics/metrics.service';
import { MetricsModule } from './metrics/metrics.module';
import { OrganizationsModule } from './controllers/organizations/organizations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
        name: 'short',
        ttl: 1000,
        limit: configService.get<number>('RETE_LIMIT_SHORT',10),
        },{
        name: 'medium',
        ttl: 60000,
        limit: configService.get<number>('RETE_LIMIT_MEDIUM',100),
        },{
        name: 'long',
        ttl: 900000,
        limit: configService.get<number>('RETE_LIMIT_LONG',1000),
        }
      ], inject: [ConfigService]
    }),
    ProxyModule,
    MiddlewareModule,
    AuthModule,
    MetricsModule,
    OrganizationsModule,
  ],
  controllers: [HealthController, MetricsController],
  providers: [
    HealthService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    MetricsService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: any) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
