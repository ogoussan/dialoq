// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { QueryRunner } = require('typeorm');

module.exports = class UserNullableLastname1692703129160 {
  name = 'UserNullableLastname1692703129160';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastname" DROP NOT NULL`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastname" SET NOT NULL`
    );
  }
};
