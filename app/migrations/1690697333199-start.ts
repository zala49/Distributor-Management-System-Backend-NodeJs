import { MigrationInterface, QueryRunner } from "typeorm";

export class Start1690697333199 implements MigrationInterface {
    name = 'Start1690697333199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "UQ_9297ff513a6e9f448b6a0cf31a0"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD "DCityPrimary" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "PK_7f898a022a4a204ec085ffb72d9"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "PK_dbcbc2f15ac6eaf3d433e46c680" PRIMARY KEY ("DistributorCityId", "DCityPrimary")`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "PK_dbcbc2f15ac6eaf3d433e46c680"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "PK_8ef1ea3adc74a986325b4fe12a5" PRIMARY KEY ("DCityPrimary")`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ALTER COLUMN "DistributorCityId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "UQ_b0b8c4c1ae9fe403797c42012ef" UNIQUE ("DistributorId", "DistributorCityName", "DistributorCityId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "UQ_b0b8c4c1ae9fe403797c42012ef"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ALTER COLUMN "DistributorCityId" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "PK_8ef1ea3adc74a986325b4fe12a5"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "PK_dbcbc2f15ac6eaf3d433e46c680" PRIMARY KEY ("DistributorCityId", "DCityPrimary")`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "PK_dbcbc2f15ac6eaf3d433e46c680"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "PK_7f898a022a4a204ec085ffb72d9" PRIMARY KEY ("DistributorCityId")`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP COLUMN "DCityPrimary"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "UQ_9297ff513a6e9f448b6a0cf31a0" UNIQUE ("DistributorId", "DistributorCityName")`);
    }

}
