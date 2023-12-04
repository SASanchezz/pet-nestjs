import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1701686671750 implements MigrationInterface {
  name = 'CreateUser1701686671750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(20) NOT NULL, "password" character varying(255) NOT NULL, "accessToken" character varying(255), "refreshToken" character varying(255), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user" ("email", "password") VALUES ('admin@admin', 'test-pass')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
