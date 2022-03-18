import { Router } from 'express'
import MensajeContr from '../controllers/mensajeContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerMensajes = Router();

/**
 * @openapi
 * tags:
 *  - name: Mensajes
 *    description: "Api de Mensajes"
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      MensajeRequest:
 *          type: object
 *          properties:
 *              type:
 *                  type: string
 *              text:
 *                  type: string
 *      MensajeResponse:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              mail:
 *                  type: string
 *              avatar:
 *                  type: string
 *              type:
 *                  type: string
 *              text:
 *                  type: string
 *              timestamp:
 *                  type: string
 */

/**** Rutas ****/


/**
 * @openapi
 * /api/mensajes:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Obtener mensajes
 *      description: Obtener todos los mensajes
 *      responses:
 *          200:
 *              description:
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/MensajeResponse'
 */
routerMensajes.get('/', MensajeContr.get.bind(MensajeContr))

/**
 * @openapi
 * /api/mensajes/{id}:
 *  get:
 *      tags:
 *      - Mensajes
 *      summary: Obtener mensaje
 *      description: Obtener el mensaje con id pasado por parametro 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del mensaje
 *      responses:
 *          200:
 *              description: OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MensajeResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Mensaje no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 */
routerMensajes.get('/:id', MensajeContr.getById.bind(MensajeContr))

/**
 * @openapi
 * /api/mensajes/usuario/{idUsuario}:
 *  post:
 *      tags:
 *      - Mensajes
 *      summary: Generar mensaje del usuario
 *      description: Generar un mensaje nuevo para el usuario dado por parametro
 *      parameters:
 *          - in: path
 *            name: idUsuario
 *            required: true
 *            description: ID del usuario
 *      requestBody:
 *          description: mensaje a crear
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/MensajeRequest'
 *      responses:
 *          201:
 *              description: Creado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MensajeResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Usuario no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          403:
 *              description: Requiere autorizacion
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerMensajes.post('/usuario/:idUsuario', isAuthenticated, isAuthorized, MensajeContr.postByUser.bind(MensajeContr))

/**
 * @openapi
 * /api/mensajes/{id}:
 *  delete:
 *      tags:
 *      - Mensajes
 *      summary: Eliminar mensaje
 *      description: Elimina un mensaje
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del mensaje
 *      responses:
 *          200:
 *              description: Eliminado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          nullable: true
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Mensaje no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          403:
 *              description: Requiere autorizacion
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerMensajes.delete('/:id', isAuthenticated, isAuthorized, MensajeContr.delete.bind(MensajeContr))


export { routerMensajes }