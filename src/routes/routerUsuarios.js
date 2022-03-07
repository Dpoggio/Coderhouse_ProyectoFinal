import { Router } from 'express'
import UsuariosContr from '../controllers/usuarioContr.js'
import { isAdmin } from '../lib/auth.js'

const routerUsuarios = Router();

/**** Rutas ****/
routerUsuarios.get('/', isAdmin, UsuariosContr.get)
routerUsuarios.get('/:id', isAdmin, UsuariosContr.getById)
routerUsuarios.post('/', UsuariosContr.post)
routerUsuarios.put('/:id', isAdmin, UsuariosContr.put)
routerUsuarios.delete('/:id', isAdmin, UsuariosContr.delete)


export { routerUsuarios }