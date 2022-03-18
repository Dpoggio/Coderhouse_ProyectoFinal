import { Router } from 'express'
import ProductosContr from '../controllers/productoContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerProductos = Router();

/**** Rutas ****/
/**
 * @openapi
 * tags:
 *  - name: Productos
 *    description: "Api de Productos"
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      ProductoRequest:
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
 *              stock:
 *                  type: number
 *      ProductoResponse:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
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
 *              stock:
 *                  type: number
 *              timestamp:
 *                  type: string
 */


/**
 * @openapi
 * /api/productos:
 *  get:
 *      tags:
 *      - Productos
 *      summary: Obtener productos
 *      description: Obtener todos los productos
 *      responses:
 *          200:
 *              description: Respuesta OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/ProductoResponse'
 */
routerProductos.get('/', ProductosContr.get.bind(ProductosContr))

/**
 * @openapi
 * /api/productos/{id}:
 *  get:
 *      tags:
 *      - Productos
 *      summary: Obtener producto
 *      description: Obtener el producto con id pasado por parametro 
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del producto
 *      responses:
 *          200:
 *              description: Respuesta OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ProductoResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Producto no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 */
routerProductos.get('/:id', ProductosContr.getById.bind(ProductosContr))

/**
 * @openapi
 * /api/productos:
 *  post:
 *      tags:
 *      - Productos
 *      summary: Generar producto
 *      description: Generar un producto nuevo
 *      requestBody:
 *          description: producto a crear
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductoRequest'
 *      responses:
 *          201:
 *              description: Creado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ProductoResponse'
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
routerProductos.post('/', isAuthenticated, isAuthorized, ProductosContr.post.bind(ProductosContr))

/**
 * @openapi
 * /api/productos/{id}:
 *  put:
 *      tags:
 *      - Productos
 *      summary: Actualizar producto
 *      description: Actualiza un producto
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del producto
 *      requestBody:
 *          description: nueva descripticion del producto
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductoRequest'
 *      responses:
 *          200:
 *              description: Actualizado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ProductoResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Producto no encontrado
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
routerProductos.put('/:id', isAuthenticated, isAuthorized, ProductosContr.put.bind(ProductosContr))

/**
 * @openapi
 * /api/productos/{id}:
 *  delete:
 *      tags:
 *      - Productos
 *      summary: Eliminar producto
 *      description: Elimina un producto
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del producto
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
 *              description: Producto no encontrado
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
routerProductos.delete('/:id', isAuthenticated, isAuthorized, ProductosContr.delete.bind(ProductosContr))


export { routerProductos }