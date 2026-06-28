import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../controllers/auth/auth.service';
import { serviceConfig } from '../config/gateway.config';

@Injectable()
export class SessionGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {}

  async canActivate(  context: ExecutionContext, ):  Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const sessiontoken = request.headers['authorization'];

    if (!sessiontoken) throw new UnauthorizedException('No session token provided');

    try {
      const session = await this.authService.validateSessionToken(sessiontoken);
      if (!session.valid) throw new UnauthorizedException('Invalid session token');
      request.user = session.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid session token');
    }
  }
}
