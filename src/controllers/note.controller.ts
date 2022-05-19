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
   *   parameters:
   *     - in: query
   *       name: name
   *       required: true
   *       description: Input name of the Note
   *       schema:
   *         type: string
   *     - in: query
   *       name: heading
   *       required: true
   *       description: Input heading
   *       schema:
   *         type: string
   *     - in: query
   *       name: folder
   *       required: true
   *       description: Folder id
   *       schema:
   *         type: string
   *     - in: query
   *       name: type
   *       required: true
   *       description: Choose note type
   *       schema:
   *         type: string
   *         enum:
   *           - TEXT
   *           - LIST
   *     - in: query
   *       name: share_policy
   *       required: true
   *       description: Choose share policy
   *       schema:
   *         type: string
   *         enum:
   *           - PUBLIC
   *           - PRIVATE
   *     - in: query
   *       name: note_body
   *       required: true
   *       minItems: 1
   *       description: Add note body
   *       schema:
   *         type: array
   *         items:
   *           type: string
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
    let payload = req.body as NoteCreationAttrubutes;
    payload = { ...payload, ...req.query };

    let u = await noteService.create(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /note/update:
   *  put:
   *   tags: [Note]
   *   summary: Update note
   *   parameters:
   *     - in: query
   *       name: note
   *       required: true
   *       description: Note id
   *       schema:
   *         type: string
   *         example: note_id
   *     - in: query
   *       name: name
   *       required: true
   *       description: New name of the Note
   *       schema:
   *         type: string
   *     - in: query
   *       name: heading
   *       required: true
   *       description: New heading of the Note
   *       schema:
   *         type: string
   *     - in: query
   *       name: folder
   *       description: Change folder
   *       schema:
   *         type: string
   *         example: folder_id
   *     - in: query
   *       name: share_policy
   *       description: Change share policy
   *       required: true
   *       schema:
   *         type: string
   *         enum:
   *           - PUBLIC
   *           - PRIVATE
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
    let payload = req.body as NoteUpdateAttrubutes;
    payload = { ...payload, ...req.query };

    let u = await noteService.update(payload);
    return res.json({ isSuccess: true, data: u });
  }

  /**
   * @swagger
   * /note/remove:
   *  delete:
   *   tags: [Note]
   *   summary: Remove note
   *   parameters:
   *     - in: query
   *       name: note
   *       required: true
   *       description: Note id
   *       schema:
   *         type: string
   *         example: note_id
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
    let payload = req.body as NoteUpdateAttrubutes;
    payload = { ...payload, ...req.query };

    let u = await noteService.remove(payload);
    return res.json({ isSuccess: true, data: u });
  }
}
