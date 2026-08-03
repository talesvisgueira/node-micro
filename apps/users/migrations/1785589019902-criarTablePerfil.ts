import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTablePerfil1785589019902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_perfil" (
            "id" character(36) varying NOT NULL,
            "name" character(30) varying NOT NULL,
            "description" character(300) varying NOT NULL,
            "active" boolean NOT NULL DEFAULT true,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_perfil" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tb_perfil"`);
    }

}
