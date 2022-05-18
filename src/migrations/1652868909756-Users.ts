import { MigrationInterface, QueryRunner } from 'typeorm';
import users from './data/users.json';

export class Users1652868909756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let r = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('User')
      .values(users)
      .execute();

    if (r) {
      console.log(
        '%c Migration "Users" succesfull..',
        'background: white; color: green'
      );
    } else {
      console.log(
        '%c ERROR: Migration "Users"',
        'background: #222; color: red'
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
