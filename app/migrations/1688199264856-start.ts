import { MigrationInterface, QueryRunner } from "typeorm";

export class Start1688199264856 implements MigrationInterface {
    name = 'Start1688199264856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_info" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Auth0UserId" character varying NOT NULL, "Name" character varying NOT NULL, "Email" character varying NOT NULL, "EmailVerified" boolean NOT NULL, "Nickname" character varying NOT NULL, "Picture" character varying NOT NULL, "Role" character varying, "Auth0RoleId" character varying, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1d78c7cb31da96f12a3a5cca25d" UNIQUE ("Auth0UserId"), CONSTRAINT "PK_855b0cf66b13bf5816695cd5158" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_info"`);
    }

}
