import { Folder, User } from '../entities';
import {
  FolderCreationAttrubutes,
  FolderGetAttrubutes,
  FolderRemoveAttrubutes,
  FolderUpdateAttrubutes,
} from '../interfaces/Folder';

export class FolderService {
  async get({ folder }: FolderGetAttrubutes) {
    return await Folder.findOne(folder);
  }

  async create({ name, user_id }: FolderCreationAttrubutes) {
    let user = await User.findOne({ id: user_id });
    let folder: Folder = await Folder.create({ name, user }).save();

    return {
      id: folder.id,
      name: folder.name,
      user_id: folder.user.id,
    };
  }

  async update({ folder, name }: FolderUpdateAttrubutes) {
    await Folder.update(folder, {
      name,
    });

    return {
      id: folder,
      name: name,
    };
  }

  async remove({ folder }: FolderRemoveAttrubutes) {
    let f = await Folder.findOne({ id: folder });
    let rf = await Folder.remove(f);

    return rf;
  }
}
