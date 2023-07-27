import { MigrationInterface, QueryRunner } from "typeorm";

export class Cityerror1690473975475 implements MigrationInterface {
    name = 'Cityerror1690473975475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc1b12069e9b237325df5819c63"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_9e1cb9277700366996ad9bb1c16"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712"`);
        await queryRunner.query(`ALTER TABLE "citys" RENAME COLUMN "District" TO "CityArea"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "Packing" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "NOS" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "Scheme" character varying`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_7629e03eceb1a40039d534a591b" UNIQUE ("State", "CityName", "CityArea")`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "UQ_8a5d5196a6918ae6d4ee71257d5" UNIQUE ("CityId", "DistributorId", "MerchantName")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03" FOREIGN KEY ("ProductCategoryId") REFERENCES "products_Categorys"("ProductCategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "UQ_8a5d5196a6918ae6d4ee71257d5"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_7629e03eceb1a40039d534a591b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "Scheme"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "NOS"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "Packing"`);
        await queryRunner.query(`ALTER TABLE "citys" RENAME COLUMN "CityArea" TO "District"`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712" UNIQUE ("MerchantId", "DistributorId", "CityId")`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_9e1cb9277700366996ad9bb1c16" UNIQUE ("State", "District", "CityName")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc1b12069e9b237325df5819c63" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
