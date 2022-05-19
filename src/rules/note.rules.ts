import { check, query } from 'express-validator';
import { Note, TypeOfNote, TypeOfSharePolicy } from '../entities';
import { SortingASCDESC } from '../interfaces/Note';
import { checkIfFolderExists } from './folder.rules';

export const note = {
  get: [
    check('user_id').exists().withMessage('User id is missing'),
    query('offset')
      .optional()
      .exists()
      .withMessage('Offset is not integer')
      .custom((offset) => {
        if (offset < 1) throw new Error('Minimum offset value is 0');
        return true;
      }),
    query('limit')
      .optional()
      .exists()
      .withMessage('Limit is not integer')
      .custom((limit) => {
        if (limit < 1) throw new Error('Minimum limit value is 1');
        return true;
      }),
    query('heading_sort')
      .optional()
      .exists()
      .custom((heading_sort) => {
        if (!(heading_sort in SortingASCDESC))
          throw new Error('Heading sort should be ASC or DESC');
        return true;
      }),
    query('policy_sort')
      .optional()
      .exists()
      .custom((policy_sort) => {
        if (!(policy_sort in TypeOfSharePolicy))
          throw new Error('Policy sort should be PRIVATE or PUBLIC');
        return true;
      }),
    query('policy_filter')
      .optional()
      .exists()
      .custom((policy_filter) => {
        if (!(policy_filter in TypeOfSharePolicy))
          throw new Error('Policy sort should be PRIVATE or PUBLIC');
        return true;
      }),
    query('note_folder_filter').optional().exists({ checkFalsy: true }),
    query('note_text_filter').optional().exists({ checkFalsy: true }),
  ],
  getNoteById: [
    check('user_id').exists(),
    check('noteId')
      .exists({ checkFalsy: true })
      .withMessage('Note id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfNoteExists(id, req)),
  ],
  create: [
    check('user_id').exists(),
    query('name')
      .exists({ checkFalsy: true })
      .withMessage('Note name is missing')
      .bail(),
    query('folder')
      .exists()
      .withMessage('Folder id is missing')
      .bail()
      .custom(
        async (folder, { req }) => await checkIfFolderExists(folder, req)
      ),
    query('heading')
      .exists({ checkFalsy: true })
      .withMessage('Heading is missing')
      .bail(),
    query('type')
      .exists()
      .withMessage('Type is missing')
      .bail()
      .custom(
        (
          type,
          {
            req: {
              query: { note_body },
            },
          }
        ) => {
          if (!(type in TypeOfNote)) throw new Error('Type does not exist');
          if (type === TypeOfNote.TEXT && Array.isArray(note_body))
            throw new Error(
              'Type is TEXT, but you provided array of Note Bodies'
            );
          return true;
        }
      ),
    query('share_policy')
      .exists()
      .withMessage('Share policy is missing')
      .bail()
      .custom((type) => {
        if (!(type in TypeOfSharePolicy))
          throw new Error('Share policy does not exist');
        return true;
      }),
    query('note_body').exists(),
  ],
  update: [
    check('user_id').exists(),
    query('name')
      .exists({ checkFalsy: true })
      .withMessage('Name is missing')
      .bail(),
    query('heading')
      .exists({ checkFalsy: true })
      .withMessage('Heading is missing')
      .bail(),
    query('note')
      .exists()
      .withMessage('Note id is missing')
      .bail()
      .custom(async (note, { req }) => await checkIfNoteExists(note, req)),
    query('folder')
      .exists()
      .withMessage('Folder id is missing')
      .bail()
      .custom(
        async (folder, { req }) => await checkIfFolderExists(folder, req)
      ),
  ],
  remove: [
    query('user_id').exists(),
    query('note')
      .exists({ checkFalsy: true })
      .withMessage('Note id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfNoteExists(id, req)),
  ],
  addNoteBody: [
    check('user_id').exists(),
    query('note')
      .exists({ checkFalsy: true })
      .withMessage('Note id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfNoteExists(id, req)),
    query('note_body')
      .exists()
      .withMessage('Note body is missing')
      .bail()
      .custom(
        async (
          note_body,
          {
            req: {
              query: { note },
            },
          }
        ) => await checkIfNoteIsList(note)
      ),
  ],
};

const checkIfNoteExists = async (id: string, req: any) => {
  await Note.findOne({ where: { id }, relations: ['user'] }).then((u) => {
    if (!u) throw new Error('Note does not exists');
    if (u.user.id !== req.body.user_id)
      throw new Error('You are not owner of the note');
  });
};

const checkIfNoteIsList = async (id: string) => {
  await Note.findOne({ where: { id }, relations: ['type'] }).then((u) => {
    if (u.type.type !== TypeOfNote.LIST)
      throw new Error(
        'Cannot add new note body, because the Note is not the type of LIST'
      );
  });
};
