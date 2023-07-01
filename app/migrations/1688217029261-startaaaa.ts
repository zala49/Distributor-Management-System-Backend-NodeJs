import { MigrationInterface, QueryRunner } from "typeorm";

export class Startaaaa1688217029261 implements MigrationInterface {
    name = 'Startaaaa1688217029261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ProductId" uuid NOT NULL, "SalesMen" character varying NOT NULL, "ProductName" character varying NOT NULL, "ProductCategory" character varying NOT NULL, "ProductQuantity" character varying NOT NULL, "OrderDate" TIMESTAMP NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3963a47ebcfe4fbadb7d2b89611" UNIQUE ("ProductId", "SalesMen", "ProductQuantity"), CONSTRAINT "PK_a9ff5d376e1dd1aef51a9f2e23b" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
