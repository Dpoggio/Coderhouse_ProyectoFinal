import { Router } from 'express'
import CarritoContr from '../controllers/carritoContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js';

const routerCarrito = Router();

/**
 * @openapi
 * tags:
 *  - name: Carritos
 *    description: "Api de Carritos"
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      CarritoResponse:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              productos:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          cantidad:
 *                              type: number
 *                          producto:
 *                              $ref: '#/components/schemas/ProductoResponse'
 *              timestamp:
 *                  type: string
 */



/**** Rutas ****/
/**
 * @openapi
 * /api/carrito:
 *  get:
 *      tags:
 *      - Carritos
 *      summary: Obtener todos los carritos
 *      description: Obtener todos los carritos
 *      responses:
 *          200:
 *              description:
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/CarritoResponse'
 */
routerCarrito.get('/', CarritoContr.get.bind(CarritoContr))

/**
 * @openapi
 * /api/carrito/{id}/productos:
 *  get:
 *      tags:
 *      - Carritos
 *      summary: Obtener carrito
 *      description: Obtener el carrito con id pasado por parametro 
 *      parameters:
 *          - in: path
 *            required: true
 *            name: id
 *            description: ID del carrito
 *      responses:
 *          200:
 *              description: OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CarritoResponse'
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Carrito no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 */
routerCarrito.get('/:id/productos', CarritoContr.getById.bind(CarritoContr))

/**
 * @openapi
 * /api/carrito:
 *  post:
 *      tags:
 *      - Carritos
 *      summary: Generar carrito
 *      description: Generar un carrito nuevo
 *      responses:
 *          201:
 *              description: Creado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CarritoResponse'
 */
routerCarrito.post('/', CarritoContr.post.bind(CarritoContr))

/**
 * @openapi
 * /api/carrito/{idCarrito}/productos/{idProducto}:
 *  post:
 *      tags:
 *      - Carritos
 *      summary: Agregar producto a carrito
 *      description: Agrega un producto existente al carrito
 *      parameters:
 *          - in: path
 *            name: idCarrito
 *            required: true
 *            description: ID del carrito
 *          - in: path
 *            name: idProducto
 *            required: true
 *            description: ID del producto a agregar
 *      responses:
 *          400:
 *              description: Id no numerico ingresado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          404:
 *              description: Carrito/Producto no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError' 
 *          201:
 *              description: Creado OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          nullable: true
 */
routerCarrito.post('/:id/productos/:id_prod', CarritoContr.postProductById.bind(CarritoContr))

/**
 * @openapi
 * /api/carrito/{id}:
 *  delete:
 *      tags:
 *      - Carritos
 *      summary: Eliminar carrito
 *      description: Elimina un carrito
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID del carrito
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
 *              description: Carrito no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 */
routerCarrito.delete('/:id', CarritoContr.delete.bind(CarritoContr))

/**
 * @openapi
 * /api/carrito/{idCarrito}/productos/{idProducto}:
 *  delete:
 *      tags:
 *      - Carritos
 *      summary: Eliminar carrito
 *      description: Elimina un carrito
 *      parameters:
 *          - in: path
 *            name: idCarrito
 *            required: true
 *            description: ID del carrito
 *          - in: path
 *            name: idProducto
 *            required: true
 *            description: ID del producto a agregar
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
 *              description: Carrito/Producto no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 */
routerCarrito.delete('/:id/productos/:id_prod', CarritoContr.deleteProductById.bind(CarritoContr))

/**
 * Por motivos de seguridad, no se documenta este Api
 * Elimina todos los carritos del contenedor (solo usada para pruebas)
 */
routerCarrito.delete('/', isAuthenticated, isAuthorized, CarritoContr.deleteAll.bind(CarritoContr))


export { routerCarrito }