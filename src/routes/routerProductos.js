import { Router } from 'express'
import ProductosContr from '../controllers/productoContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerProductos = Router();

/**** Rutas ****/
routerProductos.get('/', ProductosContr.get.bind(ProductosContr))
routerProductos.get('/:id', ProductosContr.getById.bind(ProductosContr))
routerProductos.post('/', isAuthenticated, isAuthorized, ProductosContr.post.bind(ProductosContr))
routerProductos.put('/:id', isAuthenticated, isAuthorized, ProductosContr.put.bind(ProductosContr))
routerProductos.delete('/:id', isAuthenticated, isAuthorized, ProductosContr.delete.bind(ProductosContr))


export { routerProductos }