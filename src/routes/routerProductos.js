import { Router } from 'express'
import ProductosContr from '../controllers/productoContr.js'
import { auth } from '../lib/auth.js'

const routerProductos = Router();

/**** Rutas ****/
routerProductos.get('/', ProductosContr.get)
routerProductos.get('/:id', ProductosContr.getById)
routerProductos.post('/', auth, ProductosContr.post)
routerProductos.put('/:id', auth, ProductosContr.put)
routerProductos.delete('/:id', auth, ProductosContr.delete)


export { routerProductos }