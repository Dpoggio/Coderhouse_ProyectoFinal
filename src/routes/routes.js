import { Router } from 'express'
import { routerProductos } from "./routerProductos.js"
import { routerCarrito } from "./routerCarrito.js"
import { routerUsuarios } from "./routerUsuarios.js"
import { routerOrdenes } from "./routerOrdenes.js"
import { routerAuth } from "./routerAuth.js"
import { ErrorRutaInexistente } from '../lib/errors.js'

const routes = Router();

/**** Rutas ****/
routes.use('/api/productos', routerProductos)
routes.use('/api/carrito', routerCarrito)
routes.use('/api/usuarios', routerUsuarios)
routes.use('/api/ordenes', routerOrdenes)
routes.use('/auth', routerAuth)

// Ruta inexistente
routes.use((req, res, next) => {
    next(new ErrorRutaInexistente(req.originalUrl, req.method));
})

export { routes }