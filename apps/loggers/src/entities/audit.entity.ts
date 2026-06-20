import { IsNotEmpty } from "class-validator";
import { Column,
        CreateDateColumn,
        Entity,
        PrimaryColumn,
        UpdateDateColumn } from "typeorm";

@Entity('tb_mensagem')
export class Audit {
    
    @PrimaryColumn()
    @IsNotEmpty()
    id: string;

    @Column({ length: 100 })
    origem: string;

    @Column({ length: 1000 })
    mensagem: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

  
}
