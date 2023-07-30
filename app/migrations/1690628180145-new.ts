import { MigrationInterface, QueryRunner } from "typeorm";

export class New1690628180145 implements MigrationInterface {
    name = 'New1690628180145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_7629e03eceb1a40039d534a591b"`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_7be61c75e242182bd703d2bf382" UNIQUE ("State", "CityName", "CityArea", "CityId")`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "FK_398cc82b9b8137459417618f358" FOREIGN KEY ("CityId") REFERENCES "distibutor"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "FK_398cc82b9b8137459417618f358"`);
        await queryRunner.query(`ALTER TABLE "citys" DROP CONSTRAINT "UQ_7be61c75e242182bd703d2bf382"`);
        await queryRunner.query(`ALTER TABLE "citys" ADD CONSTRAINT "UQ_7629e03eceb1a40039d534a591b" UNIQUE ("State", "CityArea", "CityName")`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
