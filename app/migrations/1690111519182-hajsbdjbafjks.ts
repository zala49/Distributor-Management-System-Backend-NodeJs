import { MigrationInterface, QueryRunner } from "typeorm";

export class Hajsbdjbafjks1690111519182 implements MigrationInterface {
    name = 'Hajsbdjbafjks1690111519182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "Packing" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "NOS" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "Scheme" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "Scheme"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "NOS"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "Packing"`);
    }

}
