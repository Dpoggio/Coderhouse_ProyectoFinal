import { Router } from 'express'
import OrdenContr from '../controllers/ordenesContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerOrdenes = Router();

/**** Rutas ****/
routerOrdenes.get('/', isAuthenticated, isAuthorized, OrdenContr.get.bind(OrdenContr))
routerOrdenes.get('/:id', isAuthenticated, OrdenContr.getById.bind(OrdenContr))
routerOrdenes.post('/', isAuthenticated, OrdenContr.post.bind(OrdenContr))
routerOrdenes.put('/:id', isAuthenticated, isAuthorized, OrdenContr.put.bind(OrdenContr))
routerOrdenes.delete('/:id', isAuthenticated, isAuthorized, OrdenContr.delete.bind(OrdenContr))


export { routerOrdenes }