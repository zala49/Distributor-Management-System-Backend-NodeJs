import { MigrationInterface, QueryRunner } from "typeorm";

export class Start1688579614425 implements MigrationInterface {
    name = 'Start1688579614425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "MerchantDetails" TO "MerchantId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "MerchantId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "MerchantId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "MerchantId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "MerchantId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "MerchantId" TO "MerchantDetails"`);
    }

}
