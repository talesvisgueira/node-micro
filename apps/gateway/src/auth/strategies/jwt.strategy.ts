import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoredExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        if (!payload) throw new UnauthorizedException();
        const user = await this.authService.validateJwtToken(payload);
        if (!user) throw new UnauthorizedException();
        return {userId: payload.sub, email: payload.email, role: payload.role};
    }

}