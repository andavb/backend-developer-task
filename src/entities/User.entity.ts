import { Entity, Column, OneToMany } from 'typeorm';
import { Folder } from './Folder.entity';
import { Model } from './Model.entity';
import { Note } from './Note.entity';

@Entity('User')
export class User extends Model {
  @Column({
    length: 100,
  })
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  refresh_token: string;

  /* Folders */
  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[];

  /* Notes */
  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
