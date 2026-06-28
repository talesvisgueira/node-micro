import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import { serviceConfig } from '@/src/config/gateway.config';
import { OrganizationRequest } from '@myorg/core/src/interfaces/organizationRequest';


@Injectable()
export class OrganizationsService {

    private readonly logger = new Logger(OrganizationsService.name);

    constructor( private readonly httpService: HttpService,
                private readonly jwtService: JwtService) {}

    async save(organizationRequest: {code: string, name: string, email: string}): Promise<any> {
        this.logger.warn(`Prerparando para salvar a pessoa: ${organizationRequest.name}` );
        try {
            const { data } = await firstValueFrom(
                this.httpService.post<OrganizationRequest>(
                    `${serviceConfig.organizations.url}/create`,organizationRequest,
                    {
                        timeout: serviceConfig.users.timeout,
                    }));
            return data;
        } catch (error) {
            throw new ConflictException('Registration organization failed');
        }
    }
}
