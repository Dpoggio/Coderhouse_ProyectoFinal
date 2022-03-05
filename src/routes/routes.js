import { Router } from 'express'
import { routerProductos } from "./routerProductos.js"
import { routerCarrito } from "./routerCarrito.js"
import cfg from '../config.js'

const routes = Router();

/**** Rutas ****/
routes.use('/api/productos', routerProductos)
routes.use('/api/carrito', routerCarrito)

// Ruta inexistente
routes.use((req, res, next) => {
    next({
        code: cfg.ROUTE_NOT_FOUND_ERRCODE,
        httpStatusCode: cfg.HTTP_NOT_FOUND,
        message: `ruta '${req.originalUrl}' metodo '${req.method}' no implementada`
    });
})

export { routes }