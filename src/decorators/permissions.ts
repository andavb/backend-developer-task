import 'reflect-metadata';
import { MetadataKeys } from './enums/MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

export function CheckPermission() {
  return function (target: any, key: string, desc: RouteHandlerDescriptor) {
    const perms =
      Reflect.getMetadata(MetadataKeys.PERMISSION, target, key) || [];
    Reflect.defineMetadata(
      MetadataKeys.PERMISSION,
      [...perms, true],
      target,
      key
    );
  };
}
