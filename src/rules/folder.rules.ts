import { check } from 'express-validator';
import { Folder } from '../entities';

export const folder = {
  get: [check('user_id').exists().withMessage('User id is missing')],
  getById: [
    check('user_id').exists(),
    check('folderId')
      .exists({ checkFalsy: true })
      .withMessage('Folder id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfFolderExists(id, req)),
  ],
  create: [
    check('user_id').exists(),
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Missing folder name')
      .bail(),
  ],
  update: [
    check('user_id').exists(),
    check('folder')
      .exists({ checkFalsy: true })
      .withMessage('Folder id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfFolderExists(id, req)),
    check('name').exists({ checkFalsy: true }),
  ],
  remove: [
    check('user_id').exists(),
    check('folder')
      .exists({ checkFalsy: true })
      .withMessage('Folder id is missing')
      .bail()
      .custom(async (id, { req }) => await checkIfFolderExists(id, req)),
  ],
};

export const checkIfFolderExists = async (id: string, req: any) => {
  await Folder.findOne({ where: { id }, relations: ['user'] }).then((u) => {
    if (!u) throw new Error('Folder does not exists');
    if (u.user.id !== req.body.user_id)
      throw new Error('You are not owner of the folder');
  });
};
