import 'reflect-metadata';
import { AppRouter } from '../router/AppRouter';
import { Methods } from './enums/Methods';
import { MetadataKeys } from './enums/MetadataKeys';
import { rules } from '../rules/rules';
import { validateRules } from './validateRules';
import { accessTokenValidation } from '../middlewares/accessTokenValidation.middleware';
const util = require('util');

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    console.log(util.inspect(target, false, null, true /* enable colors */));

    for (let key in target.prototype) {
      console.log(key);

      const routeHandler = target.prototype[key];
      //Get endpoint of api
      const path = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );

      //Get type of API request - CRUD
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.METHOD,
        target.prototype,
        key
      );

      //Inject middlewares into api call
      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];

      // Validating the body of request
      // Using routePrefix based on authentication rules
      const cleanPrefix = routePrefix.split('/').join('');
      let cleanPath = path.substring(1, path.length);

      //Remove params from endpoint
      if (cleanPath.includes(':')) {
        cleanPath = cleanPath.substring(0, cleanPath.indexOf(':') - 1);
      }

      //Token validation on non Auth endpoints
      let tokenValidaton = (req, res, next) => next();
      if (cleanPrefix !== 'auth') {
        tokenValidaton = accessTokenValidation;
      }

      //Applying rules to endpoints
      let applyRules = (req, res, next) => next();
      let validator = (req, res, next) => next();

      //If rule exists apply it else continue to service
      if (rules[cleanPrefix] && rules[cleanPrefix][cleanPath]) {
        applyRules = rules[cleanPrefix][cleanPath];
        validator = validateRules();
      }

      //Checking permissions
      let checkPermissions = (req, res, next) => next();

      //Builds endpoint
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          tokenValidaton,
          applyRules,
          validator,
          checkPermissions,
          ...middlewares,
          routeHandler
        );
      }
    }
  };
}
