import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("MS-Products");

  const port = process.env.PORT ?? 3002;
  await app.listen(port);

  logger.warn(`Microserviço 'Products' ativo na porta: ${port}`);

}
bootstrap();
