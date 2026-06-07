import { Injectable,Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';


@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {

    private readonly logger = new Logger(RabbitmqService.name);
    private connection: amqp.ChannelModel;
    private channel: amqp.Channel;

    constructor(private readonly configService: ConfigService){}

    async onModuleInit(){
        await this.connect();
    }

    async onModuleDestroy(){
        await this.disconnect();
    }

    private async connect() {
        try {
            const rabbitmqUrl = this.configService.get<string>(
                                'RABBITMQ_URL',
                                'amqp://',)
            this.connection = await amqp.connect(rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            this.logger.log(`Connected to RabbitMQ sucessfully.`);

            this.channel.on('error',(err) =>{
                this.logger.log(`Connected to RabbitMQ error.`);
            });

            this.channel.on('close',() =>{
                this.logger.log(`Connected to RabbitMQ closed.`);
            });

            this.channel.on('blocked',(reason) =>{
                this.logger.log(`Connected to RabbitMQ blocked.`);
            });

            this.channel.on('unblocked',() =>{
                this.logger.log(`Connected to RabbitMQ unblocked.`);
            });
        } catch (error) {
            this.logger.error('Failed to connect to RabbitMQ.');
        }

    }

    private async disconnect() {
        try {
            if (this.channel) {
                await this.channel.close();
                this.logger.log(`RabbitMQ channel closed.`);
            }

            if (this.connection) {
                await this.connection.close();
                this.logger.log(`RabbitMQ connection disconnected.`);
            }
        } catch (error) {
            this.logger.error('Failed to disconnect to RabbitMQ.');
        }
    }

    async publisMessage(exchange: string, routingKey: string, message: any) {
        try {
            if (!this.channel) {
                this.logger.warn('RabbitMQ channel not available.');
                return;
            }
            await this.channel.assertExchange(exchange, '',{durable: true});
            const messageBuffer = Buffer.from(JSON.stringify(message));
            const published = this.channel.publish(exchange,
                                                    routingKey,
                                                    messageBuffer,
                                                    {   persistent: true,
                                                        timestamp: Date.now(),
                                                        contentType:'application/json'});
            if (!published) throw new Error('Failed to publish message to RabbitMQ.')
            this.logger.log('Publishing message to RabbitMQ.');
        } catch (error) {
            this.logger.error('Error Publishing message to RabbitMQ.', error);
        }
    }

}
