import { Body, Controller, Get, HttpStatus, Post ,Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Http2ServerResponse } from 'node:http2';

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
      return this.appService.login(body);
  }

  @Post("/register")
  async register(@Body() body) {
    return this.appService.register(body)
  }

  
}
