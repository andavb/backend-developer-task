import { check, query } from 'express-validator';
import { Note, TypeOfNote, TypeOfSharePolicy } from '../entities';
import { checkIfFolderExists } from './folder.rules';

export const note = {
  get: [
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
    check('user_id').exists(),
    check('note')
      .exists({ checkFalsy: true })
      .withMessage('Note id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfNoteExists(id, req)),
  ],
};

const checkIfNoteExists = async (id: string, req: any) => {
  await Note.findOne({ where: { id }, relations: ['user'] }).then((u) => {
    if (!u) throw new Error('Note does not exists');
    if (u.user.id !== req.body.user_id)
      throw new Error('You are not owner of the note');
  });
};
