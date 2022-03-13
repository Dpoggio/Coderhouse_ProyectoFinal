import UsuarioApi from '../services/UsuarioApi.js'
import BaseController from './baseController.js'


/**** Rutas ****/
class UsuarioContr extends BaseController {
    
    static ServiceApi = UsuarioApi

}

export default UsuarioContr