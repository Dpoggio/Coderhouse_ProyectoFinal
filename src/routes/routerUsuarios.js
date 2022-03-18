import { Router } from 'express'
import UsuariosContr from '../controllers/usuarioContr.js'
import { isAuthorized, isAuthenticated } from '../lib/auth.js'

const routerUsuarios = Router();

/**
 * @openapi
 * tags:
 *  - name: Productos
 *    description: "Api de Productos"
 */

/**
 * @openapi
 * definitions:
 *  UsuarioRequest:
 *      type: object
 *      properties:
 *          username:
 *              type: string
 *          password:
 *              type: string
 *          nombre:
 *              type: number
 *          apellido:
 *              type: string
 *          direccion:
 *              type: string
 *          fechanacimiento:
 *              type: string
 *          telefono:
 *              type: number
 *          imagenurl:
 *              type: string
 *          admin:
 *              type: boolean
 *              descripcion: solo disponible para modificacion
 *  UsuarioResponse:
 *      type: object
 *      properties:
 *          id:
 *              type: number
 *          username:
 *              type: string
 *          nombre:
 *              type: number
 *          apellido:
 *              type: string
 *          direccion:
 *              type: string
 *          fechanacimiento:
 *              type: string
 *          telefono:
 *              type: number
 *          imagenurl:
 *              type: string
 *          admin:
 *              type: boolean
 */

/**
 * @openapi
 * /api/usuarios:
 *  get:
 *      tags:
 *      - Usuarios
 *      summary: Obtener usuarios
 *      description: Obtener todos los usuarios
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/UsuarioResponse'
 *          403:
 *              description: Requiere autorizacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerUsuarios.get('/', isAuthenticated, isAuthorized, UsuariosContr.get.bind(UsuariosContr))

/**
 * @openapi
 * /api/usuarios/{id}:
 *  get:
 *      tags:
 *      - Usuarios
 *      summary: Obtener usuario
 *      description: Obtener el usuario con id pasado por parametro 
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del usuario
 *      responses:
 *          200:
 *              description: OK
 *              schema:
 *                  $ref: '#/definitions/UsuarioResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          404:
 *              description: Usuario no encontrado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          403:
 *              description: Requiere autorizacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerUsuarios.get('/:id', isAuthenticated, isAuthorized, UsuariosContr.getById.bind(UsuariosContr))

/**
 * @openapi
 * /api/usuarios:
 *  post:
 *      tags:
 *      - Usuarios
 *      summary: Generar usuario
 *      description: Generar un usuario nuevo
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: usuario
 *            description: usuario a crear
 *            schema:
 *                  $ref: '#/definitions/UsuarioRequest'
 *      responses:
 *          201:
 *              description: Creado OK
 *              schema:
 *                  $ref: '#/definitions/UsuarioResponse'
 */
routerUsuarios.post('/', UsuariosContr.post.bind(UsuariosContr))

/**
 * @openapi
 * /api/usuarios/{id}:
 *  put:
 *      tags:
 *      - Usuarios
 *      summary: Actualizar usuario
 *      description: Actualiza un usuario
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del usuario
 *          - in: body
 *            name: usuario
 *            description: nueva descripticion del usuario
 *            schema:
 *                  $ref: '#/definitions/UsuarioRequest'
 *      responses:
 *          200:
 *              description: Actualizado OK
 *              schema:
 *                  $ref: '#/definitions/UsuarioResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          404:
 *              description: Usuario no encontrado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          403:
 *              description: Requiere autorizacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerUsuarios.put('/:id', isAuthenticated, isAuthorized, UsuariosContr.put.bind(UsuariosContr))

/**
 * @openapi
 * /api/usuarios/{id}:
 *  delete:
 *      tags:
 *      - Usuarios
 *      summary: Eliminar usuario
 *      description: Elimina un usuario
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del usuario
 *      responses:
 *          200:
 *              description: Eliminado OK
 *              schema:
 *              type: json
 *          400:
 *              description: Id no numerico ingresado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          404:
 *              description: Usuario no encontrado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          403:
 *              description: Requiere autorizacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerUsuarios.delete('/:id', isAuthenticated, isAuthorized, UsuariosContr.delete.bind(UsuariosContr))


export { routerUsuarios }