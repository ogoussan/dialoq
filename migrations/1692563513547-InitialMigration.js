// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class InitialMigration1692563513547 {
  name = 'InitialMigration1692563513547';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "image" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_type_enum" AS ENUM('cloze', 'select', 'arrange')`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "answer" character varying NOT NULL, "question" character varying NOT NULL, "translation" character varying NOT NULL, "type" "public"."task_type_enum" NOT NULL, "options" character varying, "isCompleted" boolean, "lessonId" uuid NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lesson_language_enum" AS ENUM('german', 'french', 'spanish')`
    );
    await queryRunner.query(
      `CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "userId" uuid NOT NULL, "language" "public"."lesson_language_enum" NOT NULL, "theme" character varying NOT NULL, "subtopic" character varying NOT NULL, "topic" character varying NOT NULL, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_dec5819f5bdcc8b9344794aa624" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_dec5819f5bdcc8b9344794aa624"`
    );
    await queryRunner.query(`DROP TABLE "lesson"`);
    await queryRunner.query(`DROP TYPE "public"."lesson_language_enum"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "public"."task_type_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
};
