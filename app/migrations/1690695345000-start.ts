import { MigrationInterface, QueryRunner } from "typeorm";

export class Start1690695345000 implements MigrationInterface {
    name = 'Start1690695345000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "FirmName" character varying`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD "FirmName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" DROP COLUMN "FirmName"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "FirmName"`);
    }

}
