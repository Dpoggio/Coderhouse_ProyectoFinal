import { Router } from 'express'
import ProductosContr from '../controllers/productoContr.js'
import { isAuthenticated } from '../lib/auth.js'

const routerProductos = Router();

/**** Rutas ****/
routerProductos.get('/', ProductosContr.get)
routerProductos.get('/:id', ProductosContr.getById)
routerProductos.post('/', isAuthenticated, ProductosContr.post)
routerProductos.put('/:id', isAuthenticated, ProductosContr.put)
routerProductos.delete('/:id', isAuthenticated, ProductosContr.delete)


export { routerProductos }