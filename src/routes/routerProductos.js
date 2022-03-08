import { Router } from 'express'
import ProductosContr from '../controllers/productoContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerProductos = Router();

/**** Rutas ****/
routerProductos.get('/', ProductosContr.get)
routerProductos.get('/:id', ProductosContr.getById)
routerProductos.post('/', isAuthenticated, isAuthorized, ProductosContr.post)
routerProductos.put('/:id', isAuthenticated, isAuthorized, ProductosContr.put)
routerProductos.delete('/:id', isAuthenticated, isAuthorized, ProductosContr.delete)


export { routerProductos }