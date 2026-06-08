import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventMessageService } from '@myorg/eventer/dist/src/event.service'
import { LoggerQueueService } from './logger.service';

@Injectable()
export class LoggerConsumerService {

    private readonly logger = new Logger(LoggerConsumerService.name);
    private readonly EXCHANGE = 'loggers'
    private readonly ROUTING_KEY = 'logger-message';
    private readonly QUEUE_NAME = 'logger-queue';

    constructor(private readonly loggerQueueService: LoggerQueueService) {}

    async onModuleInit() {

        this.logger.log('Setting up Logger queue consumer....');
        await this.startConsuming();

    }

    async startConsuming() {

        this.logger.log('Starting to consumer Logger from queue');
        try {
            // await this.loggerQueueService.consumeLoggerQueue.bind(this);
            await this.loggerQueueService.consumeLoggerQueue(this.processLoggerQueue.bind(this));
            this.logger.log('Consumer Logger started sucessfully');
        } catch(error) {
            this.logger.error('Failed starting consumer Logger from queue', error);
        }
    }

    private  processLoggerQueue(message: any): void {
        try {
            this.logger.log('Proccessing message from queue');
            this.logger.log(`Message: ${message}`);
            this.logger.log('Message proccessed.');
        } catch(error) {
            this.logger.error('Failed processing message', error);
            throw error;
        }
    }
}