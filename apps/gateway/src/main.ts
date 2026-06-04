import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import MyLogger from '@myorg/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  app.use(helmet());

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Markatplace API Gateway')
    .setDescription('API Gateway for Markatplace microservice')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('',app,document);

  await app.listen(port);

  MyLogger(`API Gateway ruuning on port ${port}`);
  MyLogger(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
