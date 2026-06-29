import { Controller, Body, HttpCode, HttpStatus, Get, Post, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { OrganizationCreateRequest } from '@myorg/core/dist/interfaces/organizationCreateRequest';
import { OrganizationsService } from '@/src/controllers/organizations/organizations.service';
import { OrganizationCreateDto } from '@/src/controllers/auth/dtos/OrganizationCreateDto';

@Controller('organizations')
export class OrganizationsController {

    private readonly logger = new Logger(OrganizationsController.name);

    constructor(private readonly service: OrganizationsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Throttle({short: {  limit: 5, ttl:60000 }})
    @ApiOperation({summary: 'Busca todas organizações',
        description: 'Busca lista de organizações existentes.'
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
    async getAll() {

    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    @Throttle({medium: {  limit: 3, ttl:60000 }})
    @ApiOperation({ summary: 'Register a new organization',
        description: 'Cria um nova orgainização no sistema.'
    })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'Email já cadastrado.' })
    async register(@Body()  organizationRequest: OrganizationCreateDto) {
        this.logger.warn("Iniciando operação...");
        
        this.service.save(organizationRequest);
    }
}
