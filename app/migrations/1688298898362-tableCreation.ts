import { MigrationInterface, QueryRunner } from "typeorm";

export class TableCreation1688298898362 implements MigrationInterface {
    name = 'TableCreation1688298898362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_info" ("UserId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Auth0UserId" character varying NOT NULL, "Name" character varying NOT NULL, "Email" character varying NOT NULL, "EmailVerified" boolean NOT NULL, "Nickname" character varying NOT NULL, "Picture" character varying NOT NULL, "Role" character varying, "Auth0RoleId" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1d78c7cb31da96f12a3a5cca25d" UNIQUE ("Auth0UserId"), CONSTRAINT "PK_3872a2caa946ac97b7639c021b1" PRIMARY KEY ("UserId"))`);
        await queryRunner.query(`CREATE TABLE "meta_data" ("MetaDataId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Type" character varying NOT NULL, "Value" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1839f80b4bc131f05d34afb0ed9" UNIQUE ("Type", "Value"), CONSTRAINT "PK_2022ebee30914f09aed392051a9" PRIMARY KEY ("MetaDataId"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("OrderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductId" uuid NOT NULL, "SalesMen" character varying NOT NULL, "ProductName" character varying NOT NULL, "ProductCategory" character varying NOT NULL, "ProductQuantity" character varying NOT NULL, "OrderDate" TIMESTAMP NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611" UNIQUE ("ProductId", "SalesMen", "ProductQuantity"), CONSTRAINT "PK_81fe92d0102a32ecf1a4123ce8f" PRIMARY KEY ("OrderId"))`);
        await queryRunner.query(`CREATE TABLE "salesmen" ("SalesmanId" uuid NOT NULL DEFAULT uuid_generate_v4(), "SalesManName" character varying NOT NULL, "SalesManEmail" character varying NOT NULL, "SalesManTelNo" character varying NOT NULL, "SalesManAddress" character varying NOT NULL, "SalesManCity" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_79e6991e3c6db433427d3eec299" UNIQUE ("SalesManTelNo", "SalesManEmail"), CONSTRAINT "PK_3ec0ff7a69d6f3392152121b6c0" PRIMARY KEY ("SalesmanId"))`);
        await queryRunner.query(`CREATE TABLE "citys" ("CityId" uuid NOT NULL DEFAULT uuid_generate_v4(), "State" character varying NOT NULL, "District" character varying NOT NULL, "CityName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9e1cb9277700366996ad9bb1c16" UNIQUE ("State", "District", "CityName"), CONSTRAINT "PK_398cc82b9b8137459417618f358" PRIMARY KEY ("CityId"))`);
        await queryRunner.query(`CREATE TABLE "merchant" ("MerchantId" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorId" uuid NOT NULL, "CityId" uuid NOT NULL, "MerchantName" character varying NOT NULL, "MerchantGSTNumber" character varying NOT NULL, "MerchantEmail" character varying NOT NULL, "MerchantTelNo" character varying NOT NULL, "MerchantAddress" character varying NOT NULL, "MerchantCity" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712" UNIQUE ("CityId", "DistributorId", "MerchantId"), CONSTRAINT "PK_3a89d0e7fd56897ddff5ae07275" PRIMARY KEY ("MerchantId"))`);
        await queryRunner.query(`CREATE TABLE "distibutor" ("DistributorId" uuid NOT NULL DEFAULT uuid_generate_v4(), "CityId" uuid NOT NULL, "DistributorName" character varying NOT NULL, "DistributorEmail" character varying NOT NULL, "DistributorTelNo" character varying NOT NULL, "DistributorAddress" character varying NOT NULL, "DistributorCity" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4af6a9084570511818e61af098b" UNIQUE ("CityId", "DistributorId"), CONSTRAINT "PK_8ca283e799790ae56b8d620eb11" PRIMARY KEY ("DistributorId"))`);
        await queryRunner.query(`CREATE TABLE "products" ("ProductId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductName" character varying NOT NULL, "ProductCategory" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c5c99cbecc39fd75697b6c3d82b" UNIQUE ("ProductName", "ProductCategory"), CONSTRAINT "PK_0ea5c312e8b405e25cf6c89ac98" PRIMARY KEY ("ProductId"))`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c" FOREIGN KEY ("DistributorId", "CityId") REFERENCES "distibutor"("DistributorId","CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "FK_778428487b5fcf93ab0cc191da7" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "FK_778428487b5fcf93ab0cc191da7"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "distibutor"`);
        await queryRunner.query(`DROP TABLE "merchant"`);
        await queryRunner.query(`DROP TABLE "citys"`);
        await queryRunner.query(`DROP TABLE "salesmen"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "meta_data"`);
        await queryRunner.query(`DROP TABLE "users_info"`);
    }

}
