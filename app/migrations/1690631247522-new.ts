import { MigrationInterface, QueryRunner } from "typeorm";

export class New1690631247522 implements MigrationInterface {
    name = 'New1690631247522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "UQ_4af6a9084570511818e61af098b"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "CityId"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP COLUMN "DistributorCity"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b71c7354f515a09ec953001ac59"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2"`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "UQ_8ca283e799790ae56b8d620eb11" UNIQUE ("DistributorId")`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b71c7354f515a09ec953001ac59" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b71c7354f515a09ec953001ac59"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2"`);
        await queryRunner.query(`ALTER TABLE "distibutor" DROP CONSTRAINT "UQ_8ca283e799790ae56b8d620eb11"`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b71c7354f515a09ec953001ac59" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "DistributorCity" character varying`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD "CityId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "distibutor" ADD CONSTRAINT "UQ_4af6a9084570511818e61af098b" UNIQUE ("DistributorId", "CityId")`);
    }

}
