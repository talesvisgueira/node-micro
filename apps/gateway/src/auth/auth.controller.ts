import { Controller, Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @Throttle({short: {  limit: 5, ttl:60000 }})
    @ApiOperation({ summary: 'Login user and return session token' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: {email: string, password: string}) {
        return this.authService.login(loginDto);
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @Throttle({medium: {  limit: 3, ttl:60000 }})
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    async register(@Body() registerDto: any) {
        return this.authService.register(registerDto);
    }
}
