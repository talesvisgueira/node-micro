import { Controller, Get } from '@nestjs/common';
import { Public } from '@myorg/core/dist/decorators/public.decorator';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {

  constructor (private readonly metricsService: MetricsService) {}

  @Public()
  @Get()
  async getHealth() {
     this.metricsService.getMetrics();
  }

}
