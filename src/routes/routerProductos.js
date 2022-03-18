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
 * definitions:
 *  ProductoRequest:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          code:
 *              type: number
 *          thumbnail:
 *              type: string
 *          price:
 *              type: number
 *          stock:
 *              type: number
 *  ProductoResponse:
 *      type: object
 *      properties:
 *          id:
 *              type: number
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          code:
 *              type: number
 *          thumbnail:
 *              type: string
 *          price:
 *              type: number
 *          stock:
 *              type: number
 *          timestamp:
 *              type: string
 */


/**
 * @openapi
 * /api/productos:
 *  get:
 *      tags:
 *      - Productos
 *      summary: Obtener productos
 *      description: Obtener todos los productos
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/ProductoResponse'
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
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del producto
 *      responses:
 *          200:
 *              description: OK
 *              schema:
 *                  $ref: '#/definitions/ProductoResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          404:
 *              description: Producto no encontrado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
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
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: producto
 *            description: producto a crear
 *            schema:
 *                  $ref: '#/definitions/ProductoRequest'
 *      responses:
 *          201:
 *              description: Creado OK
 *              schema:
 *                  $ref: '#/definitions/ProductoResponse'
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
routerProductos.post('/', isAuthenticated, isAuthorized, ProductosContr.post.bind(ProductosContr))

/**
 * @openapi
 * /api/productos/{id}:
 *  put:
 *      tags:
 *      - Productos
 *      summary: Actualizar producto
 *      description: Actualiza un producto
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del producto
 *          - in: body
 *            name: producto
 *            description: nueva descripticion del producto
 *            schema:
 *                  $ref: '#/definitions/ProductoRequest'
 *      responses:
 *          200:
 *              description: Actualizado OK
 *              schema:
 *                  $ref: '#/definitions/ProductoResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              schema:
 *                  $ref: '#/definitions/CustomError'
 *          404:
 *              description: Producto no encontrado
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
routerProductos.put('/:id', isAuthenticated, isAuthorized, ProductosContr.put.bind(ProductosContr))

/**
 * @openapi
 * /api/productos/{id}:
 *  delete:
 *      tags:
 *      - Productos
 *      summary: Eliminar producto
 *      description: Elimina un producto
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del producto
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
 *              description: Producto no encontrado
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
routerProductos.delete('/:id', isAuthenticated, isAuthorized, ProductosContr.delete.bind(ProductosContr))


export { routerProductos }