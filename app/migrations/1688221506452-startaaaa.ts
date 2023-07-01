import { MigrationInterface, QueryRunner } from "typeorm";

export class Startaaaa1688221506452 implements MigrationInterface {
    name = 'Startaaaa1688221506452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "salesmen" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "SalesManName" character varying NOT NULL, "SalesManEmail" character varying NOT NULL, "SalesManTelNo" character varying NOT NULL, "SalesManAddress" character varying NOT NULL, "SalesManCity" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_79e6991e3c6db433427d3eec299" UNIQUE ("SalesManTelNo", "SalesManEmail"), CONSTRAINT "PK_56deb6a96f139091922cda53fdf" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "distibutor" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorName" character varying NOT NULL, "DistributorEmail" character varying NOT NULL, "DistributorTelNo" character varying NOT NULL, "DistributorAddress" character varying NOT NULL, "DistributorCity" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e8070b1d6506f43ed012805cb06" UNIQUE ("DistributorTelNo", "DistributorEmail"), CONSTRAINT "PK_ae32312564d65054b6a021706c4" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "merchant" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "MerchantName" character varying NOT NULL, "MerchantEmail" character varying NOT NULL, "MerchantTelNo" character varying NOT NULL, "MerchantAddress" character varying NOT NULL, "MerchantCity" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_89083aa67a1244e5d3db406f9b9" UNIQUE ("MerchantTelNo", "MerchantEmail"), CONSTRAINT "PK_9523f26eac5f3d5b09443b46e13" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "merchant"`);
        await queryRunner.query(`DROP TABLE "distibutor"`);
        await queryRunner.query(`DROP TABLE "salesmen"`);
    }

}
