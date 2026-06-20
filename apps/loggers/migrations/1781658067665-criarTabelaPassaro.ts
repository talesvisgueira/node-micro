import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaPassaro1781658067665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`CREATE TABLE "tb_passaro" ("id" character varying NOT NULL, "id" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97aaf3d2e3e6fa469e813c66cea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
