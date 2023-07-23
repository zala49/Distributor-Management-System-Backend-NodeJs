import { MigrationInterface, QueryRunner } from "typeorm";

export class Newww1690106380230 implements MigrationInterface {
    name = 'Newww1690106380230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712"`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "UQ_8a5d5196a6918ae6d4ee71257d5" UNIQUE ("CityId", "DistributorId", "MerchantName")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "UQ_8a5d5196a6918ae6d4ee71257d5"`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "UQ_60e800c6f1a2dbe24fdfffe2712" UNIQUE ("MerchantId", "DistributorId", "CityId")`);
    }

}
