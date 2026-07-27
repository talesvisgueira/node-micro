import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("MS-Emails");

  const port = process.env.PORT ?? 3008;
  await app.listen(port);

  logger.warn(`Microserviço 'Emails' ativo na porta: ${port}`);

}
bootstrap();
