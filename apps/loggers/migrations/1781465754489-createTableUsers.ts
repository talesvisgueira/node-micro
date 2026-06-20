import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMensagem1781465754489 implements MigrationInterface {
    name = 'CreateTableMensagem1781465754489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_user" ("id" character varying NOT NULL, "id" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97aaf3d2e3e6fa469e813c66cea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_user"`);
    }

}
