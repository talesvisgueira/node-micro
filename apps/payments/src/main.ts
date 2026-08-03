import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const appNAme = process.env.APP_NAME ?? 'MS-Organizations';
  const logger = new Logger(appNAme);
  const port = process.env.PORT ?? 3006;
  await app.listen(port);

  logger.warn(`Microserviço '${appNAme}' ativo na porta: ${port}`);

}
bootstrap();
