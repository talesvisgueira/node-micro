import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/health")
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }

  @Post("/login")
  async login(@Body() body) {
    return {
      status: 'login ok',
      timestamp: new Date().toISOString(),
    }
  }

  @Post("/register")
  async register(@Body() body) {
    return {
      status: 'register ok',
      timestamp: new Date().toISOString(),
    }
  }
}
