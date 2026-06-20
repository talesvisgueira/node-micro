import { IsString } from 'class-validator';

export class CreateAuditDto {
    @IsString()
    origem: string;

    @IsString()
    mensagem: string;
}
