import { MigrationInterface, QueryRunner } from "typeorm";

export class St1690622785129 implements MigrationInterface {
    name = 'St1690622785129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "FK_778428487b5fcf93ab0cc191da7"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc1b12069e9b237325df5819c63"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_9e1cb9277700366996ad9bb1c16"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_c5c99cbecc39fd75697b6c3d82b"`);
        await queryRunner.query(`ALTER TABLE "citys" RENAME COLUMN "District" TO "CityArea"`);
        await queryRunner.query(`CREATE TABLE "products_Categorys" ("ProductCategoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductId" uuid NOT NULL, "ProductCategory" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c62e452853a4c6e2cd00452bfa2" UNIQUE ("ProductId", "ProductCategory"), CONSTRAINT "PK_65d74935011e624b5eb7f3217c1" PRIMARY KEY ("ProductCategoryId"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "ProductCategory"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ProductName"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ProductCategory"`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "IFSCCode" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "BankName" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "ChequeNumber1" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "ChequeNumber2" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ProductCategoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "DistributorId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "Packing" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "NOS" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "Scheme" character varying`);
        await queryRunner.query(`ALTER TABLE "users_info" ALTER COLUMN "Email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorEmail" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorTelNo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorCity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantGSTNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantEmail" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantTelNo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantCity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_0ea5c312e8b405e25cf6c89ac98" UNIQUE ("ProductId")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "ProductQuantity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salesmen" ALTER COLUMN "SalesManAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salesmen" ALTER COLUMN "SalesManCity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_7629e03eceb1a40039d534a591b" UNIQUE ("State", "CityName", "CityArea")`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "UQ_8a5d5196a6918ae6d4ee71257d5" UNIQUE ("CityId", "DistributorId", "MerchantName")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611" UNIQUE ("ProductId", "SalesMen", "ProductQuantity")`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" ADD CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03" FOREIGN KEY ("ProductCategoryId") REFERENCES "products_Categorys"("ProductCategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b71c7354f515a09ec953001ac59" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "users_info"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b71c7354f515a09ec953001ac59"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03"`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" DROP CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "UQ_8a5d5196a6918ae6d4ee71257d5"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_7629e03eceb1a40039d534a591b"`);
        await queryRunner.query(`ALTER TABLE "salesmen" ALTER COLUMN "SalesManCity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salesmen" ALTER COLUMN "SalesManAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "ProductQuantity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611" UNIQUE ("ProductId", "SalesMen", "ProductQuantity")`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_0ea5c312e8b405e25cf6c89ac98"`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantCity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantTelNo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantEmail" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantGSTNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorCity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorTelNo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorEmail" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_info" ALTER COLUMN "Email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "Scheme"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "NOS"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "Packing"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "DistributorId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ProductCategoryId"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "ChequeNumber2"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "ChequeNumber1"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "BankName"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "IFSCCode"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ProductCategory" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ProductName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "ProductCategory" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "products_Categorys"`);
        await queryRunner.query(`ALTER TABLE "citys" RENAME COLUMN "CityArea" TO "District"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_c5c99cbecc39fd75697b6c3d82b" UNIQUE ("ProductName", "ProductCategory")`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712" UNIQUE ("MerchantId", "DistributorId", "CityId")`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_9e1cb9277700366996ad9bb1c16" UNIQUE ("State", "District", "CityName")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "salesmen"("SalesmanId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc1b12069e9b237325df5819c63" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_268c0e4622dcd7c48ebf049de0c" FOREIGN KEY ("DistributorId", "CityId") REFERENCES "distibutor"("DistributorId","CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "FK_778428487b5fcf93ab0cc191da7" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
