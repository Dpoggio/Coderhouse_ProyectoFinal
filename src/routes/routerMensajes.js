import { Router } from 'express'
import MensajeContr from '../controllers/mensajeContr.js'
import { isAuthenticated, isAuthorized } from '../lib/auth.js'

const routerMensajes = Router();

/**** Rutas ****/
routerMensajes.get('/', MensajeContr.get.bind(MensajeContr))
routerMensajes.get('/:id', MensajeContr.getById.bind(MensajeContr))
routerMensajes.post('/', isAuthenticated, isAuthorized, MensajeContr.post.bind(MensajeContr))
routerMensajes.put('/:id', isAuthenticated, isAuthorized, MensajeContr.put.bind(MensajeContr))
routerMensajes.delete('/:id', isAuthenticated, isAuthorized, MensajeContr.delete.bind(MensajeContr))


export { routerMensajes }