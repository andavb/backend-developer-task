import { UserId } from '../Authentication/userId.interface';

export interface NoteGetAttrubutes extends UserId {
  note: string;
}

export interface NoteCreationAttrubutes extends UserId {
  name: string;
}

export interface NoteUpdateAttrubutes extends UserId {
  note: string;
  name: string;
}

export interface NoteRemoveAttrubutes extends NoteGetAttrubutes {}
