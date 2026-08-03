import { Controller, Get, Post,Body } from '@nestjs/common';
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

  @Post("/send-email")
  async sendEmail(@Body() body) {
    return this.appService.sendEmail(body.fromUser, body.toUser, body.subject, body.message);
  }
}
