import { Router } from 'express'
import OrdenContr from '../controllers/ordenesContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerOrdenes = Router();


/**
 * @openapi
 * tags:
 *  - name: Ordenes
 *    description: "Api de Ordenes"
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      OrdenProducto:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              code:
 *                  type: number
 *              thumbnail:
 *                  type: string
 *              price:
 *                  type: number
 *      OrdenRequest:
 *          type: object
 *          properties:
 *              usuario:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: number
 *                          required: true
 *              items:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          cantidad:
 *                              type: number
 *                          producto:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: number
 *                                      required: true
 *      OrdenResponse:
 *          type: object
 *          properties:
 *              order_number:
 *                  type: number
 *              mail:
 *                  type: string
 *              items:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          cantidad:
 *                              type: number
 *                          producto:
 *                              $ref: '#/components/schemas/OrdenProducto'
 *                      
 *              status:
 *                  type: string
 *              timestamp:
 *                  type: string
 */

/**** Rutas ****/

/**
 * @openapi
 * /api/ordenes:
 *  get:
 *      tags:
 *      - Ordenes
 *      summary: Obtener ordenes
 *      description: Obtener todas las ordenes
 *      responses:
 *          200:
 *              description: Respuesta OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/OrdenResponse'
 *          403:
 *              description: Requiere autorizacion
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerOrdenes.get('/', isAuthenticated, isAuthorized, OrdenContr.get.bind(OrdenContr))

/**
 * @openapi
 * /api/ordenes/{id}:
 *  get:
 *      tags:
 *      - Ordenes
 *      summary: Obtener orden
 *      description: Obtener la orden con id pasado por parametro 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID de la orden
 *      responses:
 *          200:
 *              description: Respuesta OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/OrdenResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Orden no encontrada
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          401:
 *              description: Requiere autenticacion
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CustomError'
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
routerOrdenes.get('/:id', isAuthenticated, OrdenContr.getById.bind(OrdenContr))


/**
 * @openapi
 * /api/ordenes/usuario/{idUsuario}:
 *  get:
 *      tags:
 *      - Ordenes
 *      summary: Obtener ordenes de usuario
 *      description: Obtener las ordenes del usuario con id pasado por parametro. Solamente se podran obtener las ordenes del usuario autenticado.
 *      parameters:
 *          - in: path
 *            name: idUsuario
 *            required: true
 *            description: ID del usuario
 *      responses:
 *          200:
 *              description: Respuesta OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/OrdenResponse'
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
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CustomError'
 * 
 *      security:
 *          - bearerAuth: []
 *          - basicAuth: []
 */
 routerOrdenes.get('/usuario/:id', isAuthenticated, OrdenContr.getByUser.bind(OrdenContr))



/**
 * @openapi
 * /api/ordenes:
 *  post:
 *      tags:
 *      - Ordenes
 *      summary: Generar orden
 *      description: Generar una orden nueva
 *      requestBody:
 *          description: orden a crear
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OrdenRequest'
 *      responses:
 *          201:
 *              description: Creado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/OrdenResponse'
 *          404:
 *              description: Producto no encontrado
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
routerOrdenes.post('/', isAuthenticated, OrdenContr.post.bind(OrdenContr))

/**
 * @openapi
 * /api/ordenes/{id}:
 *  put:
 *      tags:
 *      - Ordenes
 *      summary: Actualizar orden
 *      description: Actualiza una orden
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID de la orden
 *      requestBody:
 *          description: nueva descripticion de la orden
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OrdenRequest'
 *      responses:
 *          200:
 *              description: Actualizado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/OrdenResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Orden no encontrada
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
routerOrdenes.put('/:id', isAuthenticated, isAuthorized, OrdenContr.put.bind(OrdenContr))

/**
 * @openapi
 * /api/ordenes/{id}:
 *  delete:
 *      tags:
 *      - Ordenes
 *      summary: Eliminar orden
 *      description: Elimina una orden
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID de la orden
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
 *              description: Orden/Producto no encontrada/o
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
routerOrdenes.delete('/:id', isAuthenticated, isAuthorized, OrdenContr.delete.bind(OrdenContr))


export { routerOrdenes }