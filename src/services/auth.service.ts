require('dotenv').config();
import * as jwt from 'jsonwebtoken';

import { User } from '../entities';
import { UserRefreshToken, Login } from '../interfaces/Authentication';
import { AppDataSource } from '../config/ormconfig';

export class AuthenticationService {
  async login(user: Login) {
    const u: User = await User.findOne({
      where: [{ username: user.username }],
    });
    const { id, username } = u;
    const refresh_token = this.createRefreshToken(id, username);

    await User.update(id, {
      refresh_token: refresh_token,
    });

    const access_token = this.createAccessToken(id, username);

    return {
      access_token,
      refresh_token,
      id,
      accessTokenExpiration: process.env.JWT_EXPIRATION,
    };
  }

  async logout({ refresh_token }: UserRefreshToken) {
    const u = await User.findOne({
      where: [{ refresh_token: refresh_token }],
    });

    await User.update(u.id, {
      refresh_token: '',
    });

    return {
      username: u.username,
    };
  }

  async refreshToken({ refresh_token }: UserRefreshToken) {
    const u = await User.findOne({
      where: [{ refresh_token: refresh_token }],
    });

    return await jwt.verify(
      refresh_token,
      process.env.JWT_SECRET,
      async (err, user) => {
        if (err) {
          await User.update(u.id, {
            refresh_token: '',
          });
          return {
            error: 'Your token in invalid. Please login.',
          };
        }

        let { id, username } = u;
        const new_refresh_token = this.createRefreshToken(id, username);
        const access_token = this.createAccessToken(id, username);

        await AppDataSource.createQueryBuilder()
          .update(User)
          .set({ refresh_token: new_refresh_token })
          .where('refresh_token = :t', {
            t: refresh_token,
          })
          .execute();

        return {
          id,
          access_token,
          refresh_token: new_refresh_token,
          accessTokenExpiration: process.env.JWT_EXPIRATION,
        };
      }
    );
  }

  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(decoded['id']);
        return;
      });
    }) as Promise<string>;
  }

  createRefreshToken(id: string, email: string) {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  createAccessToken(id: string, email: string) {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }
}
