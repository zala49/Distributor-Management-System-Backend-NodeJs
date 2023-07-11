import { MigrationInterface, QueryRunner } from "typeorm";

export class Start1688899676700 implements MigrationInterface {
    name = 'Start1688899676700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "SalesMen"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ProductName"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ProductCategory"`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "DistributorState" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "DistributorPinCode" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "IFSCcode" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "CheckNumber1" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "CheckNumber2" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorEmail" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorTelNo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorCity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantGSTNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantEmail" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantTelNo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantCity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "SalesmenId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_271a1088e06bcd1175a49f574d3" UNIQUE ("ProductId", "SalesmenId", "ProductQuantity", "MerchantId")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "salesmen"("SalesmanId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_271a1088e06bcd1175a49f574d3"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "SalesmenId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "salesmen"("SalesmanId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantCity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantTelNo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantEmail" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchant" ALTER COLUMN "MerchantGSTNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorCity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorTelNo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ALTER COLUMN "DistributorEmail" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "CheckNumber2"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "CheckNumber1"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "IFSCcode"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "DistributorPinCode"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "DistributorState"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ProductCategory" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ProductName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "SalesMen" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611" UNIQUE ("ProductId", "SalesMen", "ProductQuantity")`);
    }

}
