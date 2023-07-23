import { MigrationInterface, QueryRunner } from "typeorm";

export class Jkbajkdsjkfnajsd1690112970257 implements MigrationInterface {
    name = 'Jkbajkdsjkfnajsd1690112970257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cc1b12069e9b237325df5819c63"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03" FOREIGN KEY ("ProductCategoryId") REFERENCES "products_Categorys"("ProductCategoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9a8794c441b3b4672d07aa2cf03"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cc1b12069e9b237325df5819c63" FOREIGN KEY ("ProductId") REFERENCES "products"("ProductId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
