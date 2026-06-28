import { IsNotEmpty } from "class-validator";
import { Column,
        CreateDateColumn,
        Entity,
        PrimaryColumn,
        UpdateDateColumn } from "typeorm";

@Entity('tb_user')
export class User {

    @PrimaryColumn()
    @IsNotEmpty()
    id!: string;

    @Column({ length: 100 })
    email!: string;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 100 })
    password!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;


}
