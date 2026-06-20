import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("MS-Payments");
  const port = process.env.PORT ?? 3004;
  await app.listen(port);

  logger.warn(`Microserviço 'Payments' ativo na porta: ${port}`);

}
bootstrap();
