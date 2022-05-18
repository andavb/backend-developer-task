import { Response, Request } from 'express';
import { post, put, del, get } from '../decorators';
import { controller } from '../decorators/controller';
import {
  FolderCreationAttrubutes,
  FolderGetAttrubutes,
  FolderGetByIdAttrubutes,
  FolderRemoveAttrubutes,
  FolderUpdateAttrubutes,
} from '../interfaces/Folder';
import { FolderService } from '../services/folder.service';

const folderService = new FolderService();

@controller('/folder')
export class FolderController {
  /**
   * @swagger
   * /folder/get/:
   *  get:
   *   tags: [Folder]
   *   summary: Get my folders
   *   requestBody:
   *   responses:
   *    200:
   *      description: Read
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                properties:
   *                  info:
   *                    type: string
   *                    example: {}
   *    422:
   *      description: Invalid request
   */
  @get('/get')
  async get(req: Request, res: Response) {
    const payload = req.body as FolderGetAttrubutes;

    let u = await folderService.get(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /folder/get/{folderId}:
   *  get:
   *   tags: [Folder]
   *   summary: Get folder
   *   requestBody:
   *   parameters:
   *     - in: path
   *       name: folderId
   *       required: true
   *       schema:
   *         type: string
   *       description: Folder id
   *   responses:
   *    200:
   *      description: Read
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                properties:
   *                  info:
   *                    type: string
   *                    example: {}
   *    422:
   *      description: Invalid request
   */
  @get('/get/:folderId')
  async getById(req: Request, res: Response) {
    const payload = {
      folder: req.params.folderId,
    } as FolderGetByIdAttrubutes;

    let u = await folderService.getById(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /folder/create:
   *  post:
   *   tags: [Folder]
   *   summary: Create folder
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               example: Example folder
   *   responses:
   *    200:
   *      description: Created
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                properties:
   *                  info:
   *                    type: string
   *                    example: {}
   *    422:
   *      description: Invalid request
   */
  @post('/create')
  async create(req: Request, res: Response) {
    const payload = req.body as FolderCreationAttrubutes;

    let u = await folderService.create(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /folder/update:
   *  put:
   *   tags: [Folder]
   *   summary: Update folder
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             folder:
   *               type: string
   *               example: folder_id
   *             name:
   *               type: string
   *               example: Example folder
   *   responses:
   *    200:
   *      description: Updated
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                properties:
   *                  info:
   *                    type: string
   *                    example: {}
   *    422:
   *      description: Invalid request
   */
  @put('/update')
  async update(req: Request, res: Response) {
    const payload = req.body as FolderUpdateAttrubutes;

    let u = await folderService.update(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /folder/remove:
   *  delete:
   *   tags: [Folder]
   *   summary: Remove folder
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             folder:
   *               type: string
   *               example: folder_id
   *   responses:
   *    200:
   *      description: Removed
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isSuccess:
   *                type: boolean
   *                example: true
   *              data:
   *                type: object
   *                properties:
   *                  info:
   *                    type: string
   *                    example: {}
   *    422:
   *      description: Invalid request
   */
  @del('/remove')
  async remove(req: Request, res: Response) {
    const payload = req.body as FolderRemoveAttrubutes;

    let u = await folderService.remove(payload);
    return res.json({ isSuccess: true, data: u });
  }
}
