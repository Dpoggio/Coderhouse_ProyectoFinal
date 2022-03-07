import { Router } from 'express'
import UsuariosContr from '../controllers/usuarioContr.js'
import { isAuthorized } from '../lib/auth.js'

const routerUsuarios = Router();

/**** Rutas ****/
routerUsuarios.get('/', isAuthorized, UsuariosContr.get)
routerUsuarios.get('/:id', isAuthorized, UsuariosContr.getById)
routerUsuarios.post('/', UsuariosContr.post)
routerUsuarios.put('/:id', isAuthorized, UsuariosContr.put)
routerUsuarios.delete('/:id', isAuthorized, UsuariosContr.delete)


export { routerUsuarios }