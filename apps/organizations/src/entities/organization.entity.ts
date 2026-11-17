import { IsNotEmpty } from "class-validator";
import { Column,
        CreateDateColumn,
        Entity,
        PrimaryColumn,
        UpdateDateColumn } from "typeorm";

@Entity('tb_organization')
export class Organization {

    @PrimaryColumn()
    @IsNotEmpty()
    id!: string;

    @Column()
    code!: string;

    @Column( )
    sigla!: string;

    @Column( )
    nome!: string;

    @Column( )
    email!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;


}
