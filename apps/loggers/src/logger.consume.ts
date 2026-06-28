import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LoggerQueueService } from './logger.service';
import { CreateAuditDto } from './audit/dto/create-audit.dto';
import { AuditService } from './audit/audit.service';
import { Audit } from './entities/audit.entity';


@Injectable()
export class LoggerConsumerService {

    private readonly logger = new Logger(LoggerConsumerService.name);
    private readonly EXCHANGE = 'loggers'
    private readonly ROUTING_KEY = 'logger-message';
    private readonly QUEUE_NAME = 'logger-queue';

    constructor(private readonly loggerQueueService: LoggerQueueService,
        private readonly auditService: AuditService
    ) {}

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

    private async processLoggerQueue(message: any): Promise<void> {
        try {
            this.logger.log('Proccessing message from queue');

            const payload: string = JSON.stringify(message);
            this.logger.log(`Payload: ${message}`);
            const {origem,acao,mensagem} =  message  ;
            this.logger.log(`Origem: ${origem} - Message: ${mensagem}`);

            let dto: CreateAuditDto = new CreateAuditDto();
            dto.origem = origem;
            dto.acao = acao;
            dto.mensagem = mensagem;
            await this.auditService.create(dto);

            this.logger.log(`Message proccessed.`);
        } catch(error) {
            this.logger.error('Failed processing message', error);
            throw error;
        }
    }
}