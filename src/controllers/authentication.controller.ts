import { Response, Request } from 'express';
import { matchedData } from 'express-validator';

import { post } from '../decorators';
import { controller } from '../decorators/controller';
import { AuthenticationService } from '../services/auth.service';
import {
  UserRefreshTokenCredentials,
  Login,
} from '../interfaces/Authentication';

const authenticationService = new AuthenticationService();

@controller('/auth')
export class AuthenticationController {
  /**
   * @swagger
   * /auth/login:
   *  post:
   *   tags: [Authentication]
   *   summary: Login
   *   security: []
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             username:
   *               type: string
   *               example: admin
   *             password:
   *               type: string
   *               example: admin
   *   responses:
   *    200:
   *      description: Created
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                exmaple: {access_token, refresh_token, username, id, accessTokenExpiration}
   *    422:
   *      description: Invalid request
   */
  @post('/login')
  async login(req: Request, res: Response) {
    const payload = matchedData(req) as Login;
    console.log(payload);
    const token = authenticationService.login(payload);

    const t = await token;
    return res.json({ isSuccess: true, data: t });
  }

  /**
   * @swagger
   * /auth/logout:
   *  post:
   *   tags: [Authentication]
   *   summary: Logout
   *   security: []
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             credentials:
   *               type: object
   *               properties:
   *                 refresh_token:
   *                   type: string
   *   responses:
   *    200:
   *      description: Created
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                example: {id, username}
   *    422:
   *      description: Invalid request
   */
  @post('/logout')
  async logout(req: Request, res: Response) {
    const payload = matchedData(req) as UserRefreshTokenCredentials;

    const token = authenticationService.logout(payload.credentials);

    const t = await token;
    return res.json({ isSuccess: true, data: t });
  }

  /**
   * @swagger
   * /auth/refreshToken:
   *  post:
   *   tags: [Authentication]
   *   summary: Get new tokens with refresh token
   *   security: []
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             credentials:
   *               type: object
   *               properties:
   *                 refresh_token:
   *                   type: string
   *   responses:
   *    200:
   *      description: Created
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                example: {id, username}
   *    422:
   *      description: Invalid request
   */
  @post('/refreshToken')
  async refreshToken(req: Request, res: Response) {
    const payload = matchedData(req) as UserRefreshTokenCredentials;
    const token = authenticationService.refreshToken(payload.credentials);

    const t = await token;
    return res.json({ isSuccess: true, data: t });
  }
}
