import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import MyLogger from '@myorg/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'blob:','https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'", 'data:', 'blob:'],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      }
  }));

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin ) return callback(null, true)
      const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || ['*'];
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },  methods: ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: [
      'Accept','Origin',
      'Authorization',
      'Content-Type','Authorization',
      'X-Requested-With',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
    ],
    credentials: true,
    maxAge: 86400,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Markatplace API Gateway')
    .setDescription(`
      API Gateway for Markatplace microservice
      
      Serviços disponíveis:
      - Users Services**: Autenticação e gestão de usuários.
      - Products Services: Catálogo de produtos.
      - Checkout Services: Carrinho e processamento de pedidos.
      - Payments Services: Processamento de paamentos.
      
      Autenticação:
      - Use JWT Bearer token para rotas protegidas.
      - Use Session token para validação de sessão.`)
    .setVersion('1.0,0')
    .setContact('Organização','<https://organizacao.com>','dev@organizacao.com')
    .setLicense('MIT','<https://organicacao.com/licenca>')
    .addBearerAuth()
    .addTag('Authentication','Autenticação e autorização dos usuários')
    .addTag('Users','Gestão dos usuários')
    .addTag('Products','Gestão dos usuários')
    .addTag('Checkouts','Carrinho de pedidos')
    .addTag('Payments','Processamento dos pagamentos')
    .addTag('Health','Monitoramentos da aplicação')
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('',app,document);

  await app.listen(port);

  MyLogger(`API Gateway ruuning on port ${port}`);
  MyLogger(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
