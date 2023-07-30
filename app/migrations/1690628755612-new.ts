import { MigrationInterface, QueryRunner } from "typeorm";

export class New1690628755612 implements MigrationInterface {
    name = 'New1690628755612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "FK_398cc82b9b8137459417618f358" FOREIGN KEY ("CityId") REFERENCES "distibutor"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "FK_398cc82b9b8137459417618f358"`);
    }

}
