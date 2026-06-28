import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1781465754499 implements MigrationInterface {
    name = 'CreateTableUsers1781465754499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_user" (
             "id" character varying NOT NULL,
             "email" character varying NOT NULL,
             "name" character varying NOT NULL,
             "created_at" TIMESTAMP NOT NULL DEFAULT now(),
             "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
             CONSTRAINT "PK_users" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_user"`);
    }

}
