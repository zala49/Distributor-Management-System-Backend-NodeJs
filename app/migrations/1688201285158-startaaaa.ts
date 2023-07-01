import { MigrationInterface, QueryRunner } from "typeorm";

export class Startaaaa1688201285158 implements MigrationInterface {
    name = 'Startaaaa1688201285158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meta_data" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Type" character varying NOT NULL, "Value" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1839f80b4bc131f05d34afb0ed9" UNIQUE ("Type", "Value"), CONSTRAINT "PK_45825abbe9f8f5da96caadef332" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meta_data"`);
    }

}
