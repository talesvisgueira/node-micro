import { ForbiddenException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { AppDataSource } from '@/src/config/datasource';
import { EventMessageService } from '@myorg/events/dist/event.service';
import { User } from '@/src/entities/user.entity';
import {v4 as uuidv4} from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);
  private readonly SOURCE = 'USERS'
  private readonly EXCHANGE = 'loggers'
  private readonly ROUTING_KEY = 'logger-message';

  private readonly repository!: Repository<User>  ;


  constructor(private readonly eventMessageService: EventMessageService) {
    this.repository = AppDataSource.getRepository(User);
  }

  getHello(): string {
    return 'Hello World Users!';
  }

  async login(loginDto: { email: string, password: string}){
    if (this.repository) {
        const entity: User | null = await this.repository.findOneBy({email: loginDto.email});
        if (!entity) throw new UnauthorizedException('Usuário não cadastrado.');
        this.logger.warn(`Usuario localizado no BD com a senha ${entity.password}`);
        if (entity.password !== loginDto.password) throw new ForbiddenException('Senha do usuário inválida.');
        this.logger.warn(`Senha do usuario verificado ....(OK)`);
        this.eventMessageService.sendEvent(this.EXCHANGE,this.ROUTING_KEY,this.SOURCE,'sucesso-autenticação',loginDto);
        return {
          status: 'User login ..OK',
          timestamp: new Date().toISOString(),
        }
    }

  }

  async register(userRequest: {  email: string, name: string, password: string, role: string}){

    if (this.repository) {
        try {
          const entity = Object.assign(new User(), userRequest);
          entity.id =  uuidv4();
          entity.created_at = new Date();
          entity.updated_at = new Date();
          this.repository.save(entity);
          this.logger.warn(`User persitido em: ${entity.created_at}`);
          this.eventMessageService.sendEvent(this.EXCHANGE,this.ROUTING_KEY,this.SOURCE,'sucesso-cadastro-usuario',userRequest);
          return {
            status: `User ${userRequest.name} register ...OK`,
            timestamp: new Date().toISOString(),
          }
        } catch(error) {
          this.logger.error(`Error no cadastro do user`);
          this.eventMessageService.sendEvent(this.EXCHANGE,this.ROUTING_KEY,this.SOURCE,'error-cadastro-usuario',userRequest);
        }
    }
  }

}
