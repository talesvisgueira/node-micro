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

  @Get("/code")
  async login(@Body() body) {
      this.appService.create(body);
      return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }

  }

  @Post("/create")
  async register(@Body() body) {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }


}
