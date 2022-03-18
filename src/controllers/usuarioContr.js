import UsuarioApi from '../services/usuarioApi.js'
import BaseController from './baseController.js'


/**** Rutas ****/
class UsuarioContr extends BaseController {
    
    static ServiceApi = UsuarioApi

}

export default UsuarioContr