import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Model } from './Model.entity';
import { Note } from './Note.entity';

export enum TypeOfSharePolicy {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

@Entity('NoteSharePolicy')
export class NoteSharePolicy extends Model {
  @Column({
    type: 'enum',
    enum: TypeOfSharePolicy,
  })
  policy: TypeOfSharePolicy;

  /* Notes */
  @OneToMany(() => Note, (note) => note.share_policy)
  @JoinColumn({
    name: 'notes',
  })
  notes: Note[];
}
