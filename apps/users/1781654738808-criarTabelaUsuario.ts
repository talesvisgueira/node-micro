import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarTabelaUsuario1781654738808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`CREATE TABLE "tb_user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "nome" character varying NOT NULL, "senha" character varying NOT NULL "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_user" PRIMARY KEY ("id"))`);
    //      await queryRunner.createTable(
    //   new Table({
    //     name: "tb_user",
    //     columns: [
    //     {
    //         name: "id",
    //         type: "uuid",
    //         isPrimary: true,
    //         isNullable: false,
    //     },
    //     {
    //         name: "email",
    //         type: "varchar(100)",
    //         isNullable: false,
    //     },
    //     {
    //         name: "nome",
    //         type: "varchar(100)",
    //         isNullable: false,
    //     },
    //     {
    //         name: "senha",
    //         type: "varchar(100)",
    //         isNullable: false,
    //     }
    //     ]
    // })
    // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_user");
    }

}
