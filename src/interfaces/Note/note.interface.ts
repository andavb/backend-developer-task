import { TypeOfNote, TypeOfSharePolicy } from '../../entities';
import { UserId } from '../Authentication/userId.interface';

export enum SortingASCDESC {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface NotesGetAttrubutes extends UserId {
  limit: number;
  offset: number;
  heading_sort: SortingASCDESC;
  policy_sort: TypeOfSharePolicy;
  policy_filter: TypeOfSharePolicy;
  note_folder_filter: string;
  note_text_filter: string;
}

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

export interface NoteAddNoteBodyAttrubutes extends UserId {
  note: string;
  note_body: string | string[];
}
