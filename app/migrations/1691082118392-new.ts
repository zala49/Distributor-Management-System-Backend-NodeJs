import { MigrationInterface, QueryRunner } from "typeorm";

export class New1691082118392 implements MigrationInterface {
    name = 'New1691082118392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_info" ("UserId" uuid NOT NULL DEFAULT uuid_generate_v4(), "Name" character varying NOT NULL, "Email" character varying, "Picture" character varying, "Role" character varying, "Password" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3872a2caa946ac97b7639c021b1" PRIMARY KEY ("UserId"))`);
        await queryRunner.query(`CREATE TABLE "citys" ("CityId" uuid NOT NULL DEFAULT uuid_generate_v4(), "State" character varying NOT NULL, "CityArea" character varying NOT NULL, "CityName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7be61c75e242182bd703d2bf382" UNIQUE ("State", "CityName", "CityArea", "CityId"), CONSTRAINT "PK_398cc82b9b8137459417618f358" PRIMARY KEY ("CityId"))`);
        await queryRunner.query(`CREATE TABLE "distributor_city" ("DCityPrimary" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorCityId" uuid NOT NULL, "DistributorId" uuid NOT NULL, "DistributorCityName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b0b8c4c1ae9fe403797c42012ef" UNIQUE ("DistributorId", "DistributorCityName", "DistributorCityId"), CONSTRAINT "PK_8ef1ea3adc74a986325b4fe12a5" PRIMARY KEY ("DCityPrimary"))`);
        await queryRunner.query(`CREATE TABLE "distibutor" ("DistributorId" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorName" character varying NOT NULL, "DistributorEmail" character varying, "DistributorTelNo" character varying, "DistributorAddress" character varying, "FirmName" character varying, "IFSCCode" character varying, "BankName" character varying, "ChequeNumber1" character varying, "ChequeNumber2" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8ca283e799790ae56b8d620eb11" UNIQUE ("DistributorId"), CONSTRAINT "PK_8ca283e799790ae56b8d620eb11" PRIMARY KEY ("DistributorId"))`);
        await queryRunner.query(`CREATE TABLE "merchant" ("MerchantId" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorId" uuid NOT NULL, "CityId" uuid NOT NULL, "MerchantName" character varying NOT NULL, "FirmName" character varying, "MerchantGSTNumber" character varying, "MerchantEmail" character varying, "MerchantTelNo" character varying, "MerchantAddress" character varying, "MerchantCity" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8a5d5196a6918ae6d4ee71257d5" UNIQUE ("CityId", "DistributorId", "MerchantName"), CONSTRAINT "PK_3a89d0e7fd56897ddff5ae07275" PRIMARY KEY ("MerchantId"))`);
        await queryRunner.query(`CREATE TABLE "products" ("ProductId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_0ea5c312e8b405e25cf6c89ac98" UNIQUE ("ProductId"), CONSTRAINT "PK_0ea5c312e8b405e25cf6c89ac98" PRIMARY KEY ("ProductId"))`);
        await queryRunner.query(`CREATE TABLE "products_Categorys" ("ProductCategoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductId" uuid NOT NULL, "ProductCategory" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_c62e452853a4c6e2cd00452bfa2" UNIQUE ("ProductId", "ProductCategory"), CONSTRAINT "PK_65d74935011e624b5eb7f3217c1" PRIMARY KEY ("ProductCategoryId"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("OrderId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductId" uuid NOT NULL, "ProductCategoryId" uuid, "DistributorId" uuid, "MerchantId" uuid NOT NULL, "SalesmenId" uuid, "SalesMen" character varying NOT NULL, "ProductQuantity" character varying, "OrderDate" TIMESTAMP NOT NULL, "Packing" character varying, "NOS" character varying, "Scheme" character varying, "Status" character varying NOT NULL DEFAULT 'Pending', "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611" UNIQUE ("ProductId", "SalesMen", "ProductQuantity"), CONSTRAINT "PK_81fe92d0102a32ecf1a4123ce8f" PRIMARY KEY ("OrderId"))`);
        await queryRunner.query(`CREATE TABLE "salesmen" ("SalesmanId" uuid NOT NULL DEFAULT uuid_generate_v4(), "SalesManName" character varying NOT NULL, "SalesManEmail" character varying NOT NULL, "SalesManTelNo" character varying NOT NULL, "SalesManAddress" character varying, "SalesManCity" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_79e6991e3c6db433427d3eec299" UNIQUE ("SalesManTelNo", "SalesManEmail"), CONSTRAINT "PK_3ec0ff7a69d6f3392152121b6c0" PRIMARY KEY ("SalesmanId"))`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_489234217e927ac458684fe0317" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" ADD CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03" FOREIGN KEY ("ProductCategoryId") REFERENCES "products_Categorys"("ProductCategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9f3a480ca0ff701eaef7e9bd4d4" FOREIGN KEY ("MerchantId") REFERENCES "merchant"("MerchantId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b71c7354f515a09ec953001ac59" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "users_info"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b71c7354f515a09ec953001ac59"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9f3a480ca0ff701eaef7e9bd4d4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03"`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" DROP CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_489234217e927ac458684fe0317"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2"`);
        await queryRunner.query(`DROP TABLE "salesmen"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "products_Categorys"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "merchant"`);
        await queryRunner.query(`DROP TABLE "distibutor"`);
        await queryRunner.query(`DROP TABLE "distributor_city"`);
        await queryRunner.query(`DROP TABLE "citys"`);
        await queryRunner.query(`DROP TABLE "users_info"`);
    }

}
