import { ForbiddenException, Injectable, Logger, UnauthorizedException, } from '@nestjs/common';
import { AppDataSource } from '@/src/config/datasource';
import { EventMessageService } from '@myorg/events/dist/event.service';
import { User } from '@/src/entities/user.entity';
import {v4 as uuidv4} from 'uuid';
import { Repository } from 'typeorm';
import { UserCreateRequest } from '@myorg/core/dist/interfaces/userCreateRequest';
// import { bcrypt } from 'bcryptjs'
import { ConsumerMetrics } from '../../../libs/core/dist/interfaces/consumerMetrics';
import { UserLoginRequest } from '@myorg/core/dist/interfaces/userLoginRequest';
import { JwtService } from '@nestjs/jwt';
import { Encriptor } from '@myorg/core/dist/encrypts/Encriptor';
import * as CryptoJS from 'crypto-js';

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


  constructor(private readonly eventMessageService: EventMessageService,
              private readonly jwtService: JwtService
  ) {
    this.repository = AppDataSource.getRepository(User);
  }

  getHello(): string {
    return 'Hello World Users!';
  }

  async login(loginDto: UserLoginRequest){
    if (this.repository) {
        const entity: User | null = await this.repository.findOneBy({email: loginDto.username});
        if (!entity) throw new UnauthorizedException('Usuário não cadastrado.');

        const passwordDecrypt = new Encriptor().decrypt(loginDto.password).toString(CryptoJS.enc.Utf8)  ;
        const isMatch = await this.bcrypt.compare(passwordDecrypt, entity.password);
        if (!isMatch) throw new ForbiddenException('Credencial do usuário inválida.');

        this.logger.warn(`Senha do usuario verificado ....(OK)`);
        this.eventMessageService.sendEvent(this.EXCHANGE,this.ROUTING_KEY,this.SOURCE,'sucesso-autenticação',loginDto);
        const userToken = await this.createTokenJWT(entity.id,entity.email, entity.name,'ADMIN','127.0.0.0');
        return {
          status: 'User login ..OK',
          timestamp: new Date().toISOString(),
          user: entity.id,
          name: entity.name,
          peril: 'ADMIN',
          token: userToken
        }
    }

  }

  private async createTokenJWT (id: string, username: string, nome: string, perfil: string, host_ip?: string) {
    // return this.jwtService.sign({ id:id, nome:"TALES A B VISGUEIRA" });
    console.log("Creating token:", process.env.JWT_SECRET);
    return await this.jwtService.signAsync({ sub: id, username: username, nome: nome, perfil: perfil, hostIP:host_ip },{
      secret: process.env.JWT_SECRET,
      expiresIn: Number(process.env.EXPIRES) || 300,
      });
  }

  async checkToken(token: string,hostIp:string): Promise<boolean> {
    try {
      var hash: string = token.replace('Bearer ', '');
      // console.log("Checking token:",  this.jwtService.decode(hash) );
      const decoded = this.jwtService.decode(hash) as { [key: string]: any };
      if (decoded['hostIP'] !== hostIp) {
        console.log("Host IP inválido:", decoded['hostIP'], hostIp);
        return false;
      }
      this.jwtService.verify( hash, {secret: process.env.JWT_SECRET,});
      return true;
    } catch (err) {
      return false;
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
