import { Router } from 'express'
import ProductosContr from '../controllers/productoContr.js'
import { isAuthorized } from '../lib/auth.js'

const routerProductos = Router();

/**** Rutas ****/
routerProductos.get('/', ProductosContr.get)
routerProductos.get('/:id', ProductosContr.getById)
routerProductos.post('/', isAuthorized, ProductosContr.post)
routerProductos.put('/:id', isAuthorized, ProductosContr.put)
routerProductos.delete('/:id', isAuthorized, ProductosContr.delete)


export { routerProductos }