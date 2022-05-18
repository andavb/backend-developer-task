import { MigrationInterface, QueryRunner } from 'typeorm';
import note_share_policies from './data/note_share_policy.json';

export class NoteSharePolicy1652872158638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let r = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('NoteSharePolicy')
      .values(note_share_policies)
      .execute();

    if (r) {
      console.log(
        '%c Migration "NoteSharePolicy" succesfull..',
        'background: white; color: green'
      );
    } else {
      console.log(
        '%c ERROR: Migration "NoteSharePolicy"',
        'background: #222; color: red'
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
