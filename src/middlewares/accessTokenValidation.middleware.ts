import { IncomingHttpHeaders } from 'http';
import { Response, NextFunction, RequestHandler, Request } from 'express';
import { AuthenticationService } from '../services/auth.service';

const authenticationService = new AuthenticationService();

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
  const header = headers.authorization as string;

  if (!header) return header;
  return header.split(' ')[1];
}

export const accessTokenValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    getTokenFromHeaders(req.headers) || req.query.token || req.body.token || '';
  const hasAccess = authenticationService.verifyToken(token);

  hasAccess
    .then((a) => {
      req.body.user_id = a;
      next();
    })
    .catch((err) => {
      return res.status(403).send({ message: 'No access' });
    });
};
