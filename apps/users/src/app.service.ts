import { ForbiddenException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { AppDataSource } from '@/src/config/datasource';
import { EventMessageService } from '@myorg/events/dist/event.service';
import { User } from '@/src/entities/user.entity';
import {v4 as uuidv4} from 'uuid';
import { Repository } from 'typeorm';
import { UserCreateRequest } from '@myorg/core/dist/interfaces/userCreateRequest';
// import { bcrypt } from 'bcryptjs'
import { ConsumerMetrics } from '../../../libs/core/dist/interfaces/consumerMetrics';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);
  private readonly SOURCE = 'USERS'
  private readonly EXCHANGE = 'loggers'
  private readonly ROUTING_KEY = 'logger-message';
  private readonly repository!: Repository<User>  ;

  private readonly bcrypt = require('bcrypt');
  private readonly saltRounds = 10;

  // private metrics: ConsumerMetrics = {
  //   totalProcessed: 0,
  //   totalSuccess: 0,
  //   totalFailed: 0,
  //   totalRetries: 0,
  //   statedAt: new Date(),
  //   averageProcessingTime: 0
  // }
  // private totalProcessingTime = 0;


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
        // if (entity.password !== loginDto.password) throw new ForbiddenException('Senha do usuário inválida.');
        const isMatch = await this.bcrypt.compare(loginDto.password, entity.password);
        if (!isMatch) throw new ForbiddenException('Senha do usuário inválida.');
        this.logger.warn(`Senha do usuario verificado ....(OK)`);
        this.eventMessageService.sendEvent(this.EXCHANGE,this.ROUTING_KEY,this.SOURCE,'sucesso-autenticação',loginDto);
        return {
          status: 'User login ..OK',
          timestamp: new Date().toISOString(),
        }
    }

  }

  async register(userRequest:  UserCreateRequest ){
    this.logger.warn(`INICIANDO CADASTRO DO USUARIO`);
    if (this.repository) {
        try {
          const entity = Object.assign(new User(), userRequest);
          entity.id =  uuidv4();
          entity.password = await this.bcrypt.hash(userRequest.password, this.saltRounds);
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
