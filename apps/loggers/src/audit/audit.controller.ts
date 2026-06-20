import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { Audit } from '../entities/audit.entity';

@Controller('audit')
export class AuditController {

  constructor(private readonly auditService: AuditService) {}

  @Post()
  async create(@Body() createAuditDto: CreateAuditDto)  {
     await this.auditService.create(createAuditDto);
    // return new Audit();
  }

  // @Get()
  // async findAll(): Promise<Audit[]>  {
  //   return await this.auditService.findAll();
  // }

}
