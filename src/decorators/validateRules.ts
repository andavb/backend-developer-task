import { NextFunction, RequestHandler, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

export function validateRules(): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    const errorFormatter = ({ msg, param }: ValidationError) => {
      return {
        error: param,
        msg,
      };
    };
    const result = validationResult(req).formatWith(errorFormatter);

    if (!result.isEmpty()) return res.status(422).json(result.array()[0]);
    next();
  };
}
