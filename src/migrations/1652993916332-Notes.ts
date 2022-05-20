import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  Folder,
  User,
  Note,
  NoteBody,
  NoteType,
  NoteSharePolicy,
  TypeOfSharePolicy,
  TypeOfNote,
} from '../entities';
import notes from './data/notes.json';

export class Notes1652993916332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const u1: User = await User.findOne({
      where: [{ username: 'test' }],
    });
    const u2: User = await User.findOne({
      where: [{ username: 'admin' }],
    });

    await notes.forEach(async (note) => {
      let r;

      let nsp: NoteSharePolicy = await NoteSharePolicy.findOne({
        policy: note.share_policy as TypeOfSharePolicy,
      });

      let t: NoteType = await NoteType.findOne({
        type: note.note_type as TypeOfNote,
      });

      let f: Folder = await Folder.findOne({
        name: note.folder_name as TypeOfNote,
      });

      if (note.user === 1) {
        r = await Note.create({
          name: note.name,
          heading: note.heading,
          user: u1,
          share_policy: nsp,
          type: t,
          folder: f,
        }).save();
      } else if (note.user === 2) {
        r = await Note.create({
          name: note.name,
          heading: note.heading,
          user: u2,
          share_policy: nsp,
          type: t,
          folder: f,
        }).save();
      }

      if (!r) throw new Error('ERROR: Migration "NOTES" (NOTES INSERTION)');

      note.note_body.forEach(async (note_body) => {
        r = await NoteBody.create({
          text: note_body.text,
          note: r.id,
        }).save();
        if (!r)
          throw new Error('ERROR: Migration "NOTES" (NOTE BODIES INSERTION)');
      });
    });

    console.log(
      '%c Migration "Notes" succesfull..',
      'background: white; color: green'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
