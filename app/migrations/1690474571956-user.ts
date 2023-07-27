import { MigrationInterface, QueryRunner } from "typeorm";

export class User1690474571956 implements MigrationInterface {
    name = 'User1690474571956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "users_info"("UserId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_31f766b57ec33c631eea0ad678a"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_31f766b57ec33c631eea0ad678a" FOREIGN KEY ("SalesmenId") REFERENCES "salesmen"("SalesmanId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
