
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {AppDataSource} from "./config/datasource.js"
import 'reflect-metadata'


async function bootstrap() {
  const appNAme = process.env.APP_NAME ?? 'MS-Loggers';
  const logger = new Logger(appNAme);
  const port = process.env.PORT ?? 3002;
  const database = process.env.DB_DATABASE ?? 'postgres';
  const db_porta = process.env.DB_PORT ?? 3501;

  const app = await NestFactory.create(AppModule);

  logger.warn(`Inicializando banco de dados...` );
  await AppDataSource.initialize();
  logger.warn(`Banco de dados: ${database} inicializado na porta ${db_porta}` );

  await app.listen(port, () => {
    logger.warn(`Microserviço '${appNAme}' ativo na porta: ${port}`);
  });

  
}
bootstrap();
