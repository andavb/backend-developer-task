import { Response, Request } from 'express';
import { post, put, del, get } from '../decorators';
import { controller } from '../decorators/controller';
import {
  NoteCreationAttrubutes,
  NoteGetAttrubutes,
  NoteRemoveAttrubutes,
  NoteUpdateAttrubutes,
} from '../interfaces/Note';
import { NoteService } from '../services/note.service';

const noteService = new NoteService();

@controller('/note')
export class NoteController {
  /**
   * @swagger
   * /note/get/{noteId}:
   *  get:
   *   tags: [Note]
   *   summary: Get note
   *   requestBody:
   *   parameters:
   *     - in: path
   *       name: noteId
   *       required: true
   *       schema:
   *         type: string
   *       description: Note id
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
  @get('/get/:noteId')
  async get(req: Request, res: Response) {
    const payload = {
      note: req.params.folderId,
    } as NoteGetAttrubutes;

    let u = await noteService.get(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /note/create:
   *  post:
   *   tags: [Note]
   *   summary: Create note
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               example: Example note
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
    const payload = req.body as NoteCreationAttrubutes;

    let u = await noteService.create(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /note/update:
   *  put:
   *   tags: [Note]
   *   summary: Update note
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             note:
   *               type: string
   *               example: note_id
   *             name:
   *               type: string
   *               example: Example note
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
    const payload = req.body as NoteUpdateAttrubutes;

    let u = await noteService.update(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /note/remove:
   *  delete:
   *   tags: [Note]
   *   summary: Remove note
   *   requestBody:
   *     required: true
   *     content:
   *       application/json:
   *         schema:
   *           type: object
   *           properties:
   *             note:
   *               type: string
   *               example: note_id
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
    const payload = req.body as NoteRemoveAttrubutes;

    let u = await noteService.remove(payload);
    return res.json({ isSuccess: true, data: u });
  }
}
