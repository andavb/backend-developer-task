import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Model } from './Model.entity';
import { Note } from './Note.entity';

export enum TypeOfNote {
  TEXT = 'TEXT',
  LIST = 'LIST',
}

@Entity('NoteType')
export class NoteType extends Model {
  @Column({
    type: 'enum',
    enum: TypeOfNote,
  })
  type: TypeOfNote;

  /* Notes */
  @OneToMany(() => Note, (note) => note.type)
  @JoinColumn({
    name: 'notes',
  })
  notes: Note[];
}
