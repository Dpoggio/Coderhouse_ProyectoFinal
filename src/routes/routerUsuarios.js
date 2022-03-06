import { Router } from 'express'
import UsuariosContr from '../controllers/usuarioContr.js'
import { auth } from '../lib/auth.js'

const routerUsuarios = Router();

/**** Rutas ****/
routerUsuarios.get('/', UsuariosContr.get)
routerUsuarios.get('/:id', UsuariosContr.getById)
routerUsuarios.post('/', auth, UsuariosContr.post)
routerUsuarios.put('/:id', auth, UsuariosContr.put)
routerUsuarios.delete('/:id', auth, UsuariosContr.delete)


export { routerUsuarios }