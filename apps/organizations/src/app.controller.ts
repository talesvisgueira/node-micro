import { Body, Controller, Get, HttpStatus, Post ,Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Http2ServerResponse } from 'node:http2';
import { IOrganization } from '@myorg/core/src/interfaces/organization';
import { Organization } from './entities/organization.entity';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/all")
  async getAll(): Promise<Organization[]> {
    return await this.appService.getAll();
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
      
      return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }

  }

  @Post("/create")
  async register(@Body() body) {
    this.appService.create(body);
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }


}
