import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("MS-Checkouts");

  const port = process.env.PORT ?? 3003;
  await app.listen(port);

  logger.warn(`Microserviço 'Checkouts' ativo na porta: ${port}`);

}
bootstrap();
