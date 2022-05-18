import 'reflect-metadata';
import { Methods } from './enums/Methods';
import { MetadataKeys } from './enums/MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routerBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    };
  };
}

export const get = routerBinder(Methods.GET);
export const post = routerBinder(Methods.POST);
export const put = routerBinder(Methods.PUT);
export const del = routerBinder(Methods.DEL);
export const patch = routerBinder(Methods.PATCH);
