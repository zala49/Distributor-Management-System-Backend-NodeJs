import { MigrationInterface, QueryRunner } from "typeorm";

export class Asdfasfdas1689784220999 implements MigrationInterface {
    name = 'Asdfasfdas1689784220999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_info" ("UserId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying NOT NULL, "Email" character varying, "Picture" character varying, "Role" character varying, "Password" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3872a2caa946ac97b7639c021b1" PRIMARY KEY ("UserId"))`);
        await queryRunner.query(`CREATE TABLE "products_Categorys" ("ProductCategoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductId" uuid NOT NULL, "ProductCategory" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c62e452853a4c6e2cd00452bfa2" UNIQUE ("ProductId", "ProductCategory"), CONSTRAINT "PK_65d74935011e624b5eb7f3217c1" PRIMARY KEY ("ProductCategoryId"))`);
        await queryRunner.query(`CREATE TABLE "products" ("ProductId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0ea5c312e8b405e25cf6c89ac98" UNIQUE ("ProductId"), CONSTRAINT "PK_0ea5c312e8b405e25cf6c89ac98" PRIMARY KEY ("ProductId"))`);
        await queryRunner.query(`CREATE TABLE "salesmen" ("SalesmanId" uuid NOT NULL DEFAULT uuid_generate_v4(), "SalesManName" character varying NOT NULL, "SalesManEmail" character varying NOT NULL, "SalesManTelNo" character varying NOT NULL, "SalesManAddress" character varying, "SalesManCity" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_79e6991e3c6db433427d3eec299" UNIQUE ("SalesManTelNo", "SalesManEmail"), CONSTRAINT "PK_3ec0ff7a69d6f3392152121b6c0" PRIMARY KEY ("SalesmanId"))`);
        await queryRunner.query(`CREATE TABLE "citys" ("CityId" uuid NOT NULL DEFAULT uuid_generate_v4(), "State" character varying NOT NULL, "District" character varying NOT NULL, "CityName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9e1cb9277700366996ad9bb1c16" UNIQUE ("State", "District", "CityName"), CONSTRAINT "PK_398cc82b9b8137459417618f358" PRIMARY KEY ("CityId"))`);
        await queryRunner.query(`CREATE TABLE "distibutor" ("DistributorId" uuid NOT NULL DEFAULT uuid_generate_v4(), "CityId" uuid NOT NULL, "DistributorName" character varying NOT NULL, "DistributorEmail" character varying, "DistributorTelNo" character varying, "DistributorAddress" character varying, "DistributorCity" character varying, "IFSCCode" character varying, "BankName" character varying, "ChequeNumber1" character varying, "ChequeNumber2" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4af6a9084570511818e61af098b" UNIQUE ("CityId", "DistributorId"), CONSTRAINT "PK_8ca283e799790ae56b8d620eb11" PRIMARY KEY ("DistributorId"))`);
        await queryRunner.query(`CREATE TABLE "merchant" ("MerchantId" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorId" uuid NOT NULL, "CityId" uuid NOT NULL, "MerchantName" character varying NOT NULL, "MerchantGSTNumber" character varying, "MerchantEmail" character varying, "MerchantTelNo" character varying, "MerchantAddress" character varying, "MerchantCity" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712" UNIQUE ("CityId", "DistributorId", "MerchantId"), CONSTRAINT "PK_3a89d0e7fd56897ddff5ae07275" PRIMARY KEY ("MerchantId"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("OrderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductId" uuid NOT NULL, "ProductCategoryId" uuid, "MerchantId" uuid NOT NULL, "SalesmenId" uuid, "SalesMen" character varying NOT NULL, "ProductQuantity" character varying, "OrderDate" TIMESTAMP NOT NULL, "Status" character varying NOT NULL DEFAULT 'Pending', "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611" UNIQUE ("ProductId", "SalesMen", "ProductQuantity"), CONSTRAINT "PK_81fe92d0102a32ecf1a4123ce8f" PRIMARY KEY ("OrderId"))`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" ADD CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "FK_778428487b5fcf93ab0cc191da7" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c" FOREIGN KEY ("DistributorId", "CityId") REFERENCES "distibutor"("DistributorId","CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc1b12069e9b237325df5819c63" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9f3a480ca0ff701eaef7e9bd4d4" FOREIGN KEY ("MerchantId") REFERENCES "merchant"("MerchantId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "salesmen"("SalesmanId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9f3a480ca0ff701eaef7e9bd4d4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc1b12069e9b237325df5819c63"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "FK_778428487b5fcf93ab0cc191da7"`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" DROP CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "merchant"`);
        await queryRunner.query(`DROP TABLE "distibutor"`);
        await queryRunner.query(`DROP TABLE "citys"`);
        await queryRunner.query(`DROP TABLE "salesmen"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "products_Categorys"`);
        await queryRunner.query(`DROP TABLE "users_info"`);
    }

}
