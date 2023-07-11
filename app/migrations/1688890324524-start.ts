import { MigrationInterface, QueryRunner } from "typeorm";

export class Start1688890324524 implements MigrationInterface {
    name = 'Start1688890324524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_info" ADD "Password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_info" DROP COLUMN "Password"`);
    }

}
