import { MigrationInterface, QueryRunner } from "typeorm";

export class Grate1690707628535 implements MigrationInterface {
    name = 'Grate1690707628535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "FK_778428487b5fcf93ab0cc191da7"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_7629e03eceb1a40039d534a591b"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "UQ_4af6a9084570511818e61af098b"`);
        await queryRunner.query(`CREATE TABLE "distributor_city" ("DCityPrimary" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorCityId" uuid NOT NULL, "DistributorId" uuid NOT NULL, "DistributorCityName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b0b8c4c1ae9fe403797c42012ef" UNIQUE ("DistributorId", "DistributorCityName", "DistributorCityId"), CONSTRAINT "PK_8ef1ea3adc74a986325b4fe12a5" PRIMARY KEY ("DCityPrimary"))`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "CityId"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "DistributorCity"`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "FirmName" character varying`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD "FirmName" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "DistributorId" uuid`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "UQ_8ca283e799790ae56b8d620eb11" UNIQUE ("DistributorId")`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_7be61c75e242182bd703d2bf382" UNIQUE ("State", "CityName", "CityArea", "CityId")`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_489234217e927ac458684fe0317" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b71c7354f515a09ec953001ac59" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b71c7354f515a09ec953001ac59"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_489234217e927ac458684fe0317"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_7be61c75e242182bd703d2bf382"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "UQ_8ca283e799790ae56b8d620eb11"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "DistributorId"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP COLUMN "FirmName"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "FirmName"`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "DistributorCity" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "CityId" uuid NOT NULL`);
        await queryRunner.query(`DROP TABLE "distributor_city"`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "UQ_4af6a9084570511818e61af098b" UNIQUE ("DistributorId", "CityId")`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_7629e03eceb1a40039d534a591b" UNIQUE ("State", "CityArea", "CityName")`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c" FOREIGN KEY ("DistributorId", "CityId") REFERENCES "distibutor"("DistributorId","CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "FK_778428487b5fcf93ab0cc191da7" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
