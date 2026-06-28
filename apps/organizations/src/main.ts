import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import MyLogger from '@myorg/logger';
import { Logger, ValidationPipe } from '@nestjs/common';
import {AppDataSource} from "./config/datasource.js"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("MS-Users");

  const port = process.env.PORT ?? 3001;
  const db_porta = process.env.DB_PORT ?? 3501;
  const database = process.env.DB_DATABASE ?? 'postgres';

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  logger.warn(`Inicializando banco de dados...` );
  await AppDataSource.initialize();
  logger.warn(`Banco de dados: ${database} inicializado na porta ${db_porta}` );

  await app.listen(port);

  logger.warn(`Microserviço 'Users' ativo na porta: ${port}`);

}
bootstrap();
