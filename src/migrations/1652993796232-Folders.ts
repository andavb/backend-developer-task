import { MigrationInterface, QueryRunner } from 'typeorm';
import { Folder, User } from '../entities';
import folders from './data/folders.json';

export class Folders1652993796232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let u1: User = await User.findOne({
      where: [{ username: 'test' }],
    });
    let u2: User = await User.findOne({
      where: [{ username: 'admin' }],
    });

    await folders.forEach(async (folder) => {
      let r;

      if (folder.user === 1) {
        r = await Folder.create({
          name: folder.name,
          user: u1,
        }).save();
      } else if (folder.user === 2) {
        r = await Folder.create({
          name: folder.name,
          user: u2,
        }).save();
      }
      if (!r) throw new Error('ERROR: Migration "Folders"');
    });

    console.log(
      '%c Migration "Folders" succesfull..',
      'background: white; color: green'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
