import {
  Folder,
  Note,
  NoteBody,
  NoteSharePolicy,
  NoteType,
  TypeOfNote,
  TypeOfSharePolicy,
  User,
} from '../entities';
import {
  NoteAddNoteBodyAttrubutes,
  NoteCreationAttrubutes,
  NoteGetAttrubutes,
  NoteRemoveAttrubutes,
  NotesGetAttrubutes,
  NoteUpdateAttrubutes,
} from '../interfaces/Note';

export class NoteService {
  async get({
    user_id,
    offset,
    limit,
    policy_sort,
    heading_sort,
    policy_filter,
    note_folder_filter,
    note_text_filter,
  }: NotesGetAttrubutes) {
    console.log(note_folder_filter);
    let query = Note.createQueryBuilder('note')
      .leftJoinAndSelect('note.folder', 'folder')
      .leftJoinAndSelect('note.type', 'type')
      .leftJoinAndSelect('note.noteBodies', 'noteBodies')
      .leftJoinAndSelect('note.share_policy', 'share_policy')
      .where('note.user = :user_id', { user_id });

    //Filter by share policy
    if (policy_filter)
      query.andWhere('share_policy.policy = :policy_filter', { policy_filter });

    //Filter by folder name
    if (note_folder_filter)
      query.andWhere('folder.name like :name', {
        name: `%${note_folder_filter}%`,
      });

    //Filter by texts in note bodies
    if (note_text_filter)
      query.andWhere('noteBodies.text like :text', {
        text: `%${note_text_filter}%`,
      });

    //Sort by Heading
    if (heading_sort) query.orderBy('note.heading', heading_sort);

    //Limit and offset
    if (limit) query.limit(limit);
    if (offset) query.offset(offset);

    let notes: Note[] = await query.getMany();

    //Policy Sort
    if (policy_sort) {
      const order = {
        [TypeOfSharePolicy.PRIVATE]:
          policy_sort === TypeOfSharePolicy.PRIVATE ? 0 : 1,
        [TypeOfSharePolicy.PUBLIC]:
          policy_sort === TypeOfSharePolicy.PUBLIC ? 0 : 1,
      } as const;

      notes.sort((a: Note, b: Note) => {
        return order[a.share_policy.policy] - order[b.share_policy.policy];
      });
    }

    return {
      notes,
      offset,
      limit,
    };
  }

  async getNoteById({ note }: NoteGetAttrubutes) {
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

  async addNoteBody(addNote: NoteAddNoteBodyAttrubutes) {
    let note = await Note.findOne({ id: addNote.note });

    if (Array.isArray(addNote.note_body)) {
      addNote.note_body.forEach(async (text) => {
        await NoteBody.create({
          note: note,
          text: text,
        }).save();
      });
    } else {
      await NoteBody.create({
        note: note,
        text: addNote.note_body as string,
      }).save();
    }

    return {
      msg: 'New note bodies succesfully added',
      note,
    };
  }
}
