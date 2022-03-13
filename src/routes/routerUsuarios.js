import { Router } from 'express'
import UsuariosContr from '../controllers/usuarioContr.js'
import { isAuthorized, isAuthenticated } from '../lib/auth.js'

const routerUsuarios = Router();

routerUsuarios.get('/', isAuthenticated, isAuthorized, UsuariosContr.get.bind(UsuariosContr))
routerUsuarios.get('/:id', isAuthenticated, isAuthorized, UsuariosContr.getById.bind(UsuariosContr))
routerUsuarios.post('/', UsuariosContr.post.bind(UsuariosContr))
routerUsuarios.put('/:id', isAuthenticated, isAuthorized, UsuariosContr.put.bind(UsuariosContr))
routerUsuarios.delete('/:id', isAuthenticated, isAuthorized, UsuariosContr.delete.bind(UsuariosContr))


export { routerUsuarios }