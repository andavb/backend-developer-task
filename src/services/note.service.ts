import {
  Folder,
  Note,
  NoteBody,
  NoteSharePolicy,
  NoteType,
  TypeOfNote,
  User,
} from '../entities';
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

  async create(note: NoteCreationAttrubutes) {
    let user = await User.findOne({ id: note.user_id });
    let f: Folder = await Folder.findOne({ id: note.folder });
    let nsp: NoteSharePolicy = await NoteSharePolicy.findOne({
      policy: note.share_policy,
    });
    let t: NoteType = await NoteType.findOne({ type: note.type });

    let n: Note = await Note.create({
      user,
      folder: f,
      name: note.name,
      heading: note.heading,
      share_policy: nsp,
      type: t,
    }).save();

    if (
      note.type === TypeOfNote.TEXT ||
      (note.type === TypeOfNote.LIST && !Array.isArray(note.note_body))
    ) {
      await NoteBody.create({
        note: n,
        text: note.note_body as string,
      }).save();
    } else if (note.type === TypeOfNote.LIST && Array.isArray(note.note_body)) {
      note.note_body.forEach(async (text) => {
        await NoteBody.create({
          note: n,
          text: text,
        }).save();
      });
    }

    return { ...n, user: n.user.id };
  }

  async update(note: NoteUpdateAttrubutes) {
    let f: Folder = await Folder.findOne({ id: note.folder });
    let nsp: NoteSharePolicy = await NoteSharePolicy.findOne({
      policy: note.share_policy,
    });

    await Note.update(note.note, {
      name: note.name,
      heading: note.heading,
      share_policy: nsp,
      folder: f,
    });

    return { note };
  }

  async remove({ note }: NoteRemoveAttrubutes) {
    let f = await Note.findOne({ id: note });
    let rf = await Note.remove(f);

    return rf;
  }
}
