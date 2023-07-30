import { MigrationInterface, QueryRunner } from "typeorm";

export class New1690638021109 implements MigrationInterface {
    name = 'New1690638021109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_489234217e927ac458684fe0317" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_489234217e927ac458684fe0317"`);
    }

}
