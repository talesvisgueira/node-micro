import { ConflictException, ForbiddenException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { AppDataSource } from '@/src/config/datasource';
import { EventMessageService } from '@myorg/events/dist/event.service';
import { Person } from '@/src/entities/person.entity';
import {v4 as uuidv4} from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  private readonly SOURCE = 'ORGANIZATIONS'
  private readonly logger = new Logger(AppService.name);
  private readonly repository!: Repository<Person>  ;



  constructor(private readonly eventMessageService: EventMessageService) {
    this.repository = AppDataSource.getRepository(Person);
  }

  getHello(): string {
    return `Hello World ${this.SOURCE}`;
  }

  async create(personRequest: { code: string, name: string, email: string }){
    if (this.repository) {
        const entity: Person | null = await this.repository.findOneBy({email: personRequest.code});
        if (entity !== null) {
          entity.id =  uuidv4();
          entity.created_at = new Date();
          entity.updated_at = new Date();
          this.repository.save(entity);
          this.logger.warn(`User persitido em: ${entity.created_at}`);
          await this.eventMessageService.sendEvent('loggers','logger-message',this.SOURCE,'sucesso-cadastro-pessoa',personRequest);
          return {
            status: `Person ${personRequest.name} register ...OK`,
            timestamp: new Date().toISOString(),
          }
        } else throw new ConflictException('Person já existe na base de dados.');

    }

  }

}
