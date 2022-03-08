import { Router } from 'express'
import UsuariosContr from '../controllers/usuarioContr.js'
import { isAuthorized, isAuthenticated } from '../lib/auth.js'

const routerUsuarios = Router();

routerUsuarios.get('/', isAuthenticated, isAuthorized, UsuariosContr.get)
routerUsuarios.get('/:id', isAuthenticated, isAuthorized, UsuariosContr.getById)
routerUsuarios.post('/', UsuariosContr.post)
routerUsuarios.put('/:id', isAuthenticated, isAuthorized, UsuariosContr.put)
routerUsuarios.delete('/:id', isAuthenticated, isAuthorized, UsuariosContr.delete)


export { routerUsuarios }