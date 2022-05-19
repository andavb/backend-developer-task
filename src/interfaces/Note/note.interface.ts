import { NoteSharePolicy, TypeOfNote, TypeOfSharePolicy } from '../../entities';
import { UserId } from '../Authentication/userId.interface';

export interface NoteGetAttrubutes extends UserId {
  note: string;
}

export interface NoteCreationAttrubutes extends UserId {
  name: string;
  heading: string;
  folder: string;
  type: TypeOfNote;
  share_policy: TypeOfSharePolicy;
  note_body: string | string[];
}

export interface NoteUpdateAttrubutes extends UserId {
  note: string;
  name: string;
  heading: string;
  folder: string;
  share_policy: TypeOfSharePolicy;
}

export interface NoteRemoveAttrubutes extends NoteGetAttrubutes {}
