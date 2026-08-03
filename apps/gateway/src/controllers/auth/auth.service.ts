import { HttpService } from '@nestjs/axios';
import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { serviceConfig } from '@/src/config/gateway.config';
import { UserLoginRequest } from '@myorg/core/dist/interfaces/userLoginRequest';
import { EventMessageService } from '@myorg/events/dist/event.service';
import { AxiosError } from 'axios';

export interface UserSession {
    valid: boolean;
    user: {
        id: string;
        username: string;
    }
}

@Injectable()
export class AuthService {
    private readonly SOURCE = 'GATEWAY'
    private readonly EXCHANGE = 'loggers'
    private readonly ROUTING_KEY = 'logger-message';

    constructor( private readonly httpService: HttpService,
                private readonly jwtService: JwtService,
                private readonly eventMessageService: EventMessageService) {}

    validateJwtToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token);
            return Promise.resolve(decoded);
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async validateSessionToken(sessionToken: string): Promise<UserSession> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<UserSession>(
                    `${serviceConfig.users.url}/sessions/validate/${sessionToken}`,
                    { timeout: serviceConfig.users.timeout,}));
            return data;
        } catch (error) {
            throw new UnauthorizedException('Invalid session token');
        }
    }

    async login(loginDto: UserLoginRequest): Promise<any> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post<UserSession>(
                    `${serviceConfig.users.url}/login`,loginDto,{
                        timeout: serviceConfig.users.timeout,
                    }));
            return data;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 403) {
                throw new UnauthorizedException('Invalid login credentials');
            } if (error instanceof AxiosError ) {
                this.eventMessageService.sendEvent(this.EXCHANGE,this.ROUTING_KEY,this.SOURCE,'falha-acesso-microservico','Ms-Users está fora do ar ou indisponível.');
                throw new NotFoundException('MS-Users is down or unavailable');
            } else {
                throw new ConflictException('Login failed');
            }
        }
    }

    async register(registerDto: {email: string, password: string}): Promise<any> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post<UserSession>(
                    `${serviceConfig.users.url}/register`,registerDto,
                    {
                        timeout: serviceConfig.users.timeout,
                    }));
            return data;
        } catch (error) {
            throw new UnauthorizedException('Registration failed');
        }
    }


}
