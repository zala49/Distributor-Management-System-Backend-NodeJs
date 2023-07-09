import { MigrationInterface, QueryRunner } from "typeorm";

export class NewStart1688823841660 implements MigrationInterface {
    name = 'NewStart1688823841660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "SalesmenId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc1b12069e9b237325df5819c63" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9f3a480ca0ff701eaef7e9bd4d4" FOREIGN KEY ("MerchantId") REFERENCES "merchant"("MerchantId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "salesmen"("SalesmanId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9f3a480ca0ff701eaef7e9bd4d4"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc1b12069e9b237325df5819c63"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "SalesmenId"`);
    }

}
