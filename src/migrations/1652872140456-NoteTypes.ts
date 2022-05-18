import { MigrationInterface, QueryRunner } from 'typeorm';
import note_types from './data/note_type.json';

export class NoteTypes1652872140456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let r = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('NoteType')
      .values(note_types)
      .execute();

    if (r) {
      console.log(
        '%c Migration "Note Types" succesfull..',
        'background: white; color: green'
      );
    } else {
      console.log(
        '%c ERROR: Migration "Note Types"',
        'background: #222; color: red'
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
