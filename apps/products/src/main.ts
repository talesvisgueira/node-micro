import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import MyLogger from '@myorg/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3002;
  await app.listen(port);

  MyLogger(`API Products ruuning on port ${port}`);

}
bootstrap();
