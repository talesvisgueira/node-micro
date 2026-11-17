import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOrganization1781465754599 implements MigrationInterface {
    name = 'CreateTableOrganization1781465754599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_organization" (
            "id" character varying NOT NULL,
            "code" character varying NOT NULL,
            "sigla" character varying NOT NULL,
            "nome" character varying NOT NULL,
            "email" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_organization" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE UNIQUE INDEX uk_organizationCode on tb_organization (code)`);
        await queryRunner.query(`CREATE UNIQUE INDEX uk_organizationSigla on tb_organization (sigla)`);
        await queryRunner.query(`CREATE UNIQUE INDEX uk_organizationEmail on tb_organization (email)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_organization"`);
    }

}
