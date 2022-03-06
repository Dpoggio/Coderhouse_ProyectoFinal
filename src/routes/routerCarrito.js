import { Router } from 'express'
import CarritoContr from '../controllers/carritoContr.js'

const routerCarrito = Router();

/**** Rutas ****/
routerCarrito.post('/', CarritoContr.post)
routerCarrito.delete('/:id', CarritoContr.deleteById)
routerCarrito.get('/', CarritoContr.get)
routerCarrito.get('/:id/productos', CarritoContr.getById)
routerCarrito.post('/:id/productos/:id_prod', CarritoContr.postProductById)
routerCarrito.delete('/:id/productos/:id_prod', CarritoContr.deleteProductById)
routerCarrito.delete('/', CarritoContr.deleteAll)


export { routerCarrito }