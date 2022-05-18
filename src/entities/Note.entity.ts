import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Folder } from './Folder.entity';
import { Model } from './Model.entity';
import { NoteBody } from './NoteBody.entity';
import { NoteSharePolicy } from './NoteSharePolicy.entity';
import { NoteType } from './NoteType.entity';
import { User } from './User.entity';

@Entity('Note')
export class Note extends Model {
  @Column()
  name: string;

  @Column()
  heading: string;

  @ManyToOne(() => Folder, (folder) => folder.notes)
  @JoinColumn({
    name: 'folder_id',
  })
  folder: Folder;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({
    name: 'creator_id',
  })
  user: User;

  @ManyToOne(() => NoteType, (noteType) => noteType.notes)
  @JoinColumn({
    name: 'type',
  })
  type: NoteType;

  @ManyToOne(() => NoteSharePolicy, (noteSharePolicy) => noteSharePolicy.notes)
  @JoinColumn({
    name: 'share_policy',
  })
  share_policy: NoteSharePolicy;

  /* Notes bodies*/
  @OneToMany(() => NoteBody, (noteBody) => noteBody.note)
  @JoinColumn({
    name: 'note_body',
  })
  noteBodies: Note[];
}
