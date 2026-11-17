import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom, from, Observable } from 'rxjs';
import { serviceConfig } from '@/src/config/gateway.config';
import { OrganizationCreateRequest } from '@myorg/core/dist/interfaces/organizationCreateRequest';
import { OrganizationResponse } from '@myorg/core/dist/interfaces/OrganizationResponse';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { IOrganization } from '@myorg/core/src/interfaces/organization';


@Injectable()
export class OrganizationsService {

    private readonly logger = new Logger(OrganizationsService.name);

    constructor( private readonly httpService: HttpService,
                private readonly jwtService: JwtService) {}

                async getAll() :Promise<IOrganization[]> {
        try {
            const response = await firstValueFrom(
                this.httpService.get<IOrganization[]>(`${serviceConfig.organizations.url}/all`,{
                    timeout: serviceConfig.organizations.timeout,
                })
            );
            return response.data;
        } catch (error) {
            throw new ConflictException('Failed to retrieve organizations');
        }
    }
    // getAll() {
    //     try {
    //         this.httpService.get<IOrganization[]>(`${serviceConfig.organizations.url}/all`,{
    //                     timeout: serviceConfig.organizations.timeout,
    //                 }).subscribe({
    //                     next: (resource) => {
    //                         const organizations: IOrganization[] = resource.data;
    //                         this.logger.warn(`Total de registros: ${organizations.length}`);
    //                         this.logger.warn(`Registros:` + JSON.stringify(organizations));
    //                         return organizations;
    //                     }
    //                 })  ;
    //     } catch (error) {
    //         throw new ConflictException('Failed to retrieve organizations');
    //     }
    // }

    async save(organizationRequest: {code: string, name: string, email: string}): Promise<any> {
        this.logger.warn(`Prerparando para salvar a organização: ${organizationRequest.name}` );
        try {
            const { data } = await firstValueFrom(
                this.httpService.post<OrganizationCreateRequest>(
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
