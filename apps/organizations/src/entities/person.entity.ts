import { IsNotEmpty } from "class-validator";
import { Column,
        CreateDateColumn,
        Entity,
        PrimaryColumn,
        UpdateDateColumn } from "typeorm";

@Entity('tb_person')
export class Person {

    @PrimaryColumn()
    @IsNotEmpty()
    id!: string;

    @Column({ length: 14 })
    code!: string;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 100 })
    email!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;


}
