import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Model } from './Model.entity';
import { Note } from './Note.entity';

@Entity('NoteBody')
export class NoteBody extends Model {
  @Column()
  text: string;

  @ManyToOne(() => Note, (note) => note.noteBodies)
  @JoinColumn({
    name: 'note_id',
  })
  note: Note;
}
