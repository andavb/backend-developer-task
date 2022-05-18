import { UserId } from '../Authentication/userId.interface';

export interface FolderGetAttrubutes extends UserId {}
export interface FolderGetByIdAttrubutes extends UserId {
  folder: string;
}

export interface FolderCreationAttrubutes extends UserId {
  name: string;
}

export interface FolderUpdateAttrubutes extends UserId {
  folder: string;
  name: string;
}

export interface FolderRemoveAttrubutes extends FolderGetByIdAttrubutes {}
