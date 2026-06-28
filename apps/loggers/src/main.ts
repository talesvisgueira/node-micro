
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import {AppDataSource} from "./config/datasource.js"
import 'reflect-metadata'


async function bootstrap() {
  const logger = new Logger("MS-Glogger");
  const port = process.env.PORT ?? 3005;
  const database = process.env.DB_DATABASE ?? 'postgres';
  const db_porta = process.env.DB_PORT ?? 3505;

  const app = await NestFactory.create(AppModule);

  logger.warn(`Inicializando banco de dados...` );
  await AppDataSource.initialize();
  logger.warn(`Banco de dados: ${database} inicializado na porta ${db_porta}` );

  await app.listen(port, () => {
    logger.warn(`Microserviço 'Glogger' ativo na porta: ${port}`);
  });

  
}
bootstrap();
