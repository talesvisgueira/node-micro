import { ConflictException, ForbiddenException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { AppDataSource } from '@/src/config/datasource';
import { EventMessageService } from '@myorg/events/dist/event.service';
import { Organization } from '@/src/entities/organization.entity';
import {v4 as uuidv4} from 'uuid';
import { Repository } from 'typeorm';
import { OrganizationCreateRequest } from '@myorg/core/dist/interfaces/organizationCreateRequest';
import { IOrganization } from '@myorg/core/dist/interfaces/organization';

@Injectable()
export class AppService {

  private readonly SOURCE = 'ORGANIZATIONS'
  private readonly logger = new Logger(AppService.name);
  private readonly repository!: Repository<Organization>  ;



  constructor(private readonly eventMessageService: EventMessageService) {
    this.repository = AppDataSource.getRepository(Organization);
  }

  getHello(): string {
    return `Hello World ${this.SOURCE}`;
  }

  async getAll(): Promise<Organization[]> {
    const organizations = await this.repository.find();
    return organizations;
  }

  async create(personRequest: OrganizationCreateRequest){
    this.logger.warn(`Cadastrando organization ${personRequest.code} - ${personRequest.name}`);
    if (this.repository) {
        const person: Organization | null = await this.repository.findOneBy({code: personRequest.code});
        if (person !== null) throw new Error('Organization já existe na base de dados.');

        const entity = Object.assign(new Organization(), personRequest);

        entity.id =  uuidv4();
        entity.created_at = new Date();
        entity.updated_at = new Date();
        this.repository.save(entity);
        this.logger.warn(`User persitido em: ${entity.created_at}`);
        await this.eventMessageService.sendEvent('loggers','logger-message',this.SOURCE,'sucesso-cadastro-person',personRequest);
        return {
          status: `Organization ${personRequest.name} register ...OK`,
          timestamp: new Date().toISOString(),
        }


    }

  }

}
