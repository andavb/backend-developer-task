import { auth } from './authentication.rules';
import { folder } from './folder.rules';
import { note } from './note.rules';

export const rules = {
  folder,
  note,
  auth,
};
