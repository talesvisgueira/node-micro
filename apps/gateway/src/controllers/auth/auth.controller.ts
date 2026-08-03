import { Throttle } from '@nestjs/throttler';
import { Controller, Body, HttpCode, HttpStatus, Post, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/src/controllers/auth//auth.service';
import { LoginDto } from '@/src/controllers/auth/dtos/login.dto';
import type { UserCreateRequest } from '@myorg/core/dist/interfaces/userCreateRequest';
import { UserCreateDto } from '@/src/controllers/auth/dtos/UserCreate.dto';

@ApiTags('Authentication')
@Controller('api')
export class AuthController {

    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @Throttle({short: {  limit: 5, ttl:60000 }})
    @ApiOperation({summary: 'Login user and return session token',
        description: 'Autentica um usuário e retorna JWT token e session token.'
    })
    @ApiResponse({
        status: 200,
        description: 'User logged in successfully',
        schema: {
            type: 'object',
            properties: {
                user: { type: 'object'},
                accessToken: { type: 'string'},
                sessionToken: { type: 'string'},
                expiresIn: { type: 'number'},
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto) {
        try {
            return this.authService.login(loginDto);
        } catch (error) {
            throw error;
        }
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @Throttle({medium: {  limit: 3, ttl:60000 }})
    @ApiOperation({ summary: 'Register a new user',
        description: 'Cria um nova conta de usuário no sistema.'
    })
    // @ApiResponse({ status: 201, description: 'User registered successfully' })
    // @ApiResponse({ status: 400, description: 'Dados inválidos' })
    // @ApiResponse({ status: 409, description: 'Email já cadastrado.' })
    async register(@Body() registerDto: UserCreateDto) {
        return this.authService.register(registerDto);
    }
}
