import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities';
import users from './data/users.json';

export class Users1652868909756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    users.forEach(async ({ name, username, password }) => {
      let r;
      r = await User.create({
        name,
        username,
        password,
      }).save();

      if (!r) throw new Error('ERROR: Migration "USER"');
    });

    console.log(
      '%c Migration "Users" succesfull..',
      'background: white; color: green'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
