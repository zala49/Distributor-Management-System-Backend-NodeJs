import { MigrationInterface, QueryRunner } from "typeorm";

export class New1690628603208 implements MigrationInterface {
    name = 'New1690628603208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_Categorys" DROP CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_0ea5c312e8b405e25cf6c89ac98" UNIQUE ("ProductId")`);
        await queryRunner.query(`ALTER TABLE "merchant" ADD CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28" FOREIGN KEY ("CityId") REFERENCES "citys"("CityId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" ADD CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_Categorys" DROP CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44"`);
        await queryRunner.query(`ALTER TABLE "merchant" DROP CONSTRAINT "FK_1c59d9865dd65cc3f5008358e28"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_0ea5c312e8b405e25cf6c89ac98"`);
        await queryRunner.query(`ALTER TABLE "products_Categorys" ADD CONSTRAINT "FK_2ef844302819ca19b7a5e65bf44" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
