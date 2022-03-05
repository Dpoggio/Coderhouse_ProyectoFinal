import { Router } from 'express'
import { routerProductos } from "./routerProductos.js"
import { routerCarrito } from "./routerCarrito.js"

const routes = Router();

/**** Rutas ****/
routes.use('/api/productos', routerProductos)
routes.use('/api/carrito', routerCarrito)

export { routes }