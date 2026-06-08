import { Injectable, Logger, } from '@nestjs/common';
// import { LoginDto } from '../../gateway/src/auth/dtos/login.dto';
import { EventMessageService } from '@myorg/eventer/dist/src/event.service';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);
  private readonly EXCHANGE = 'loggers'
  private readonly ROUTING_KEY = 'logger-message';


  constructor(private readonly eventMessageService: EventMessageService) {}

  getHello(): string {
    return 'Hello World Users!';
  }

  async login(loginDto: { email: string, password: string}){
    try {
      await this.eventMessageService.publishMessage(
        this.EXCHANGE,
        this.ROUTING_KEY,
        loginDto
      );
      this.logger.log('Message sending success from queue.');
      return {
        status: 'login ok',
        timestamp: new Date().toISOString(),
      }
    } catch(error) {
      this.logger.error('Error sending Message from queue.', error);
    }
  }
}
