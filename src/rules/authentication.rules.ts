import * as bcrypt from 'bcrypt';
import { body, check, oneOf, param } from 'express-validator';
import { User } from '../entities';
import { UserRefreshToken } from '../interfaces/Authentication';

export const auth = {
  login: [
    check('username')
      .exists({
        checkFalsy: true,
      })
      .withMessage('Invalid username')
      .bail()
      .custom(
        async (username) =>
          await User.findOne({
            where: [{ username: username }],
          }).then((user) => {
            if (!user) throw new Error();
          })
      )
      .withMessage('User doesnt exist'),
    check('password')
      .custom(async (password, { req }) => {
        return await User.find({
          where: [{ username: req.body.username }],
        }).then((u) => {
          if (!u[0]) throw new Error();

          return bcrypt
            .compare(password, u[0].password)
            .then(async function (isMatch: Boolean) {
              if (!isMatch) throw new Error();
            });
        });
      })
      .withMessage('Invalid password'),
  ],
  logout: [
    body('credentials')
      .exists()
      .withMessage('Missing credentials Token')
      .custom(async ({ refresh_token }: UserRefreshToken) => {
        return await User.findOne({
          where: [{ refresh_token: refresh_token }],
        }).then((u) => {
          if (!u) throw new Error();
        });
      })
      .withMessage('Invalid Refresh Token'),
  ],
  refreshToken: [
    body('credentials')
      .exists()
      .withMessage('Missing credentials Token')
      .custom(async ({ refresh_token }: UserRefreshToken) => {
        return await User.findOne({
          where: [{ refresh_token: refresh_token }],
        }).then((u) => {
          if (!u) throw new Error();
        });
      })
      .withMessage('Invalid Refresh Token'),
  ],
};
