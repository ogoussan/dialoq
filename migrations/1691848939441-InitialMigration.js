// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class InitialMigration1691848939441 {
  name = 'InitialMigration1691848939441';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "modelAnswers"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "answer" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "options" character varying`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."task_type_enum" RENAME TO "task_type_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_type_enum" AS ENUM('cloze', 'select', 'arrange')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "type" TYPE "public"."task_type_enum" USING "type"::"text"::"public"."task_type_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."task_type_enum_old"`);
  }

  async down(queryRunner) {
    await queryRunner.query(
      `CREATE TYPE "public"."task_type_enum_old" AS ENUM('cloze')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "type" TYPE "public"."task_type_enum_old" USING "type"::"text"::"public"."task_type_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."task_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."task_type_enum_old" RENAME TO "task_type_enum"`
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "options"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "answer"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "modelAnswers" character varying NOT NULL`
    );
  }
};
