import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventMessageModule } from '@myorg/eventer/dist/src/event.module'

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),EventMessageModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
