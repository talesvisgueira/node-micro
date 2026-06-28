import { IsString } from 'class-validator';

export class CreateAuditDto {
    @IsString()
    origem: string;

    @IsString()
    acao: string;

    @IsString()
    mensagem: string;
}
