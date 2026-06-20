import { Injectable, Logger } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from '../entities/audit.entity';
import { AppDataSource } from '../config/datasource.config';
import {v4 as uuidv4} from 'uuid';  
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';

@Injectable()
export class AuditService {

  private readonly logger = new Logger(AuditService.name);

  // constructor(@InjectRepository(Audit)
  //   private auditRepository: Repository<Audit>){}

  async create(dto: CreateAuditDto): Promise<Audit | null> {
    const auditRepository = AppDataSource.getRepository(Audit)
    if (auditRepository) {
      this.logger.log(`Gravando a mensagem: ${dto.origem} - ${dto.mensagem}`);
      
      let entity = new Audit();
      entity.id =  uuidv4();
      entity.origem = dto.origem;
      entity.mensagem = dto.mensagem;
      entity.created_at = new Date();
      entity.updated_at = new Date();
      auditRepository.save(entity);
      this.logger.warn(`Entity persitida em: ${entity.created_at}`);
      
      return entity;
    } 
    return null;
    
  }

  // async findAll(): Promise<Audit[]> {
  //   return await this.auditRepository.find();
  // }

}
