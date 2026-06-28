import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOrganization1781465754599 implements MigrationInterface {
    name = 'CreateTableOrganization1781465754599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_person" (
            "id" character varying NOT NULL,
            "code" character varying NOT NULL,
            "email" character varying NOT NULL,
            "name" character varying NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_person" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE UNIQUE INDEX uk_person on tb_person (code)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_person"`);
    }

}
