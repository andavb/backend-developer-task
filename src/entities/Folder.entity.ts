import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Model } from './Model.entity';
import { Note } from './Note.entity';
import { User } from './User.entity';

@Entity('Folder')
export class Folder extends Model {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.folders)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  /* Notes */
  @OneToMany(() => Note, (note) => note.folder)
  @JoinColumn({
    name: 'notes',
  })
  notes: Note[];
}
