import { Injectable } from '@nestjs/common';

import { Controller, Get } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class HealthService {

    constructor(private readonly proxyService: ProxyService) {}

  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        organizations: await this.proxyService.getServiceHealth('organizations'),
        users: await this.proxyService.getServiceHealth('users'),
        products: await this.proxyService.getServiceHealth('products'),
        checkout: await this.proxyService.getServiceHealth('checkouts'),
        payments: await this.proxyService.getServiceHealth('payments'),
        loggers: await this.proxyService.getServiceHealth('loggers'),
      },
    }
  }
}
