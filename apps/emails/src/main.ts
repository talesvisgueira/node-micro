import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appNAme = process.env.APP_NAME ?? 'MS-Emails';
  const logger = new Logger(appNAme);

  const port = process.env.PORT ?? 3009;

  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;

  await app.listen(port);

  logger.warn(`Microserviço '${appNAme}' ativo na porta: ${port}`);
  logger.warn(`Host SMTP '${SMTP_HOST}' na porta: ${SMTP_PORT}`);
  logger.warn(`Usuário SMTP '${SMTP_USER}'`);

}
bootstrap();
