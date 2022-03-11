import { Router } from 'express'
import OrdenesContr from '../controllers/ordenesContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerOrdenes = Router();

/**** Rutas ****/
routerOrdenes.post('/', isAuthenticated, OrdenesContr.post)


export { routerOrdenes }