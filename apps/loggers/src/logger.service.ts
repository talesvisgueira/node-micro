
import { Injectable, Logger } from '@nestjs/common';
import { EventMessageService } from '@myorg/eventer/dist/src/event.service'

@Injectable()
export class LoggerQueueService {

  private readonly logger = new Logger(LoggerQueueService.name);
  private readonly EXCHANGE = 'loggers'
  private readonly ROUTING_KEY = 'logger-message';
  private readonly QUEUE_NAME = 'logger-queue';

  constructor(private readonly eventMessageService: EventMessageService) {}

  async consumeLoggerQueue(callback: (message: any) => Promise<void>) {

    this.logger.log('Setting up Logger queue consumer....');

    await this.eventMessageService.subscribeToQueue(
      this.QUEUE_NAME,
      this.EXCHANGE,
      this.ROUTING_KEY,
      callback,
    );
    this.logger.log('Logger queue consumer is ready.');
  }
}