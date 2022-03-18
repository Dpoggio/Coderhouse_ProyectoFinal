import { Router } from 'express'
import UsuariosContr from '../controllers/usuarioContr.js'
import { isAuthorized, isAuthenticated } from '../lib/auth.js'

const routerUsuarios = Router();

/**
 * @openapi
 * tags:
 *  - name: Usuarios
 *    description: "Api de Usuarios"
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      UsuarioRequest:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              nombre:
 *                  type: number
 *              apellido:
 *                  type: string
 *              direccion:
 *                  type: string
 *              fechanacimiento:
 *                  type: string
 *              telefono:
 *                  type: number
 *              imagenurl:
 *                  type: string
 *              admin:
 *                  type: boolean
 *                  descripcion: solo disponible para modificacion
 *      UsuarioResponse:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              username:
 *                  type: string
 *              nombre:
 *                  type: number
 *              apellido:
 *                  type: string
 *              direccion:
 *                  type: string
 *              fechanacimiento:
 *                  type: string
 *              telefono:
 *                  type: number
 *              imagenurl:
 *                  type: string
 *              admin:
 *                  type: boolean
 */

/**
 * @openapi
 * /api/usuarios:
 *  get:
 *      tags:
 *      - Usuarios
 *      summary: Obtener usuarios
 *      description: Obtener todos los usuarios
 *      responses:
 *          200:
 *              description:
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/UsuarioResponse'
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
routerUsuarios.get('/', isAuthenticated, isAuthorized, UsuariosContr.get.bind(UsuariosContr))

/**
 * @openapi
 * /api/usuarios/{id}:
 *  get:
 *      tags:
 *      - Usuarios
 *      summary: Obtener usuario
 *      description: Obtener el usuario con id pasado por parametro 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del usuario
 *      responses:
 *          200:
 *              description: OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UsuarioResponse'
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
routerUsuarios.get('/:id', isAuthenticated, isAuthorized, UsuariosContr.getById.bind(UsuariosContr))

/**
 * @openapi
 * /api/usuarios:
 *  post:
 *      tags:
 *      - Usuarios
 *      summary: Generar usuario
 *      description: Generar un usuario nuevo
 *      requestBody:
 *          description: usuario a crear
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UsuarioRequest'
 *      responses:
 *          201:
 *              description: Creado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UsuarioResponse'
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
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del usuario
 *      requestBody:
 *          description: nueva descripticion del usuario
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UsuarioRequest'
 *      responses:
 *          200:
 *              description: Actualizado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UsuarioResponse'
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
routerUsuarios.put('/:id', isAuthenticated, isAuthorized, UsuariosContr.put.bind(UsuariosContr))

/**
 * @openapi
 * /api/usuarios/{id}:
 *  delete:
 *      tags:
 *      - Usuarios
 *      summary: Eliminar usuario
 *      description: Elimina un usuario
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del usuario
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
routerUsuarios.delete('/:id', isAuthenticated, isAuthorized, UsuariosContr.delete.bind(UsuariosContr))


export { routerUsuarios }