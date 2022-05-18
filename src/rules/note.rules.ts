import { check } from 'express-validator';
import { Note } from '../entities';

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
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Missing note name')
      .bail(),
  ],
  update: [
    check('user_id').exists(),
    check('note')
      .exists({ checkFalsy: true })
      .withMessage('Note id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfNoteExists(id, req)),
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
