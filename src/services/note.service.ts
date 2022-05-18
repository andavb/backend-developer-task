import { Note, User } from '../entities';
import {
  NoteCreationAttrubutes,
  NoteGetAttrubutes,
  NoteRemoveAttrubutes,
  NoteUpdateAttrubutes,
} from '../interfaces/Note';

export class NoteService {
  async get({ note }: NoteGetAttrubutes) {
    return await Note.findOne(note);
  }

  async create({ name, user_id }: NoteCreationAttrubutes) {
    let user = await User.findOne({ id: user_id });
    let folder: Note = await Note.create({ name, user }).save();

    return {
      id: folder.id,
      name: folder.name,
      user_id: folder.user.id,
    };
  }

  async update({ note, name }: NoteUpdateAttrubutes) {
    await Note.update(note, {
      name,
    });

    return {
      id: note,
      name: name,
    };
  }

  async remove({ note }: NoteRemoveAttrubutes) {
    let f = await Note.findOne({ id: note });
    let rf = await Note.remove(f);

    return rf;
  }
}
