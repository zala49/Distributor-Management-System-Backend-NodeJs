import { MigrationInterface, QueryRunner } from "typeorm";

export class New1690629795083 implements MigrationInterface {
    name = 'New1690629795083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "distributor_city" ("DistributorCityId" uuid NOT NULL DEFAULT uuid_generate_v4(), "DistributorId" uuid NOT NULL, "DistributorCityName" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9297ff513a6e9f448b6a0cf31a0" UNIQUE ("DistributorId", "DistributorCityName"), CONSTRAINT "PK_7f898a022a4a204ec085ffb72d9" PRIMARY KEY ("DistributorCityId"))`);
        await queryRunner.query(`ALTER TABLE "distributor_city" ADD CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2" FOREIGN KEY ("DistributorId") REFERENCES "distibutor"("DistributorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "distributor_city" DROP CONSTRAINT "FK_c80335ce110b96d79eb0829f7f2"`);
        await queryRunner.query(`DROP TABLE "distributor_city"`);
    }

}
