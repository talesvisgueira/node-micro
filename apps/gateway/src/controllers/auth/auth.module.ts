import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EventMessageModule } from '@myorg/events/dist/event.module';

@Module({
    imports: [
        PassportModule,
        HttpModule,
        EventMessageModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '5m' },
            }),
            inject: [ConfigService],
        })
    ],
    providers: [AuthService],
    exports: [],
    controllers: [AuthController],
})
export class AuthModule {}
