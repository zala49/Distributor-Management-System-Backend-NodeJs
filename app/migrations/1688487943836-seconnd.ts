import { MigrationInterface, QueryRunner } from "typeorm";

export class Seconnd1688487943836 implements MigrationInterface {
    name = 'Seconnd1688487943836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "MerchantDetails" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "Status" character varying NOT NULL DEFAULT 'Pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "Status"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "MerchantDetails"`);
    }

}
