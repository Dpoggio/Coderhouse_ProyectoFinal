import { Router } from 'express'
import CarritoContr from '../controllers/carritoContr.js'

const routerCarrito = Router();

/**** Rutas ****/
routerCarrito.post('/', CarritoContr.post.bind(CarritoContr))
routerCarrito.delete('/:id', CarritoContr.delete.bind(CarritoContr))
routerCarrito.get('/', CarritoContr.get.bind(CarritoContr))
routerCarrito.get('/:id/productos', CarritoContr.getById.bind(CarritoContr))
routerCarrito.post('/:id/productos/:id_prod', CarritoContr.postProductById.bind(CarritoContr))
routerCarrito.delete('/:id/productos/:id_prod', CarritoContr.deleteProductById.bind(CarritoContr))
routerCarrito.delete('/', CarritoContr.deleteAll.bind(CarritoContr))


export { routerCarrito }