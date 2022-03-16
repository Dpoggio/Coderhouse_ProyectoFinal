import cfg from '../config.js'
import NotificationApi from '../services/notificationApi.js'
import UsuarioApi from '../services/usuarioApi.js'
import { ErrorFormatoIncorrecto } from '../lib/errors.js'
import OrdenApi from '../services/ordenApi.js'
import BaseController from './baseController.js'

const usuarioApi = new UsuarioApi()

class OrdenesContr extends BaseController {
    static ServiceApi = OrdenApi
    
    /*static async post(req, res, next) {  
        try {
            const orden = req.body
            if (!req.body.usuario || !req.body.usuario.id ) {
                throw new ErrorFormatoIncorrecto('Campo "usuario.id" requerido')
            }
            const idUsuario = req.body.usuario.id
            const usuario = await usuarioApi.get(idUsuario)
            NotificationApi.notificateNewOrder(orden, usuario)
            NotificationApi.notificateNewOrderToUser(orden, usuario)
            res.status(cfg.HTTP_CREATED).json(orden)
        } catch (error) {
            next(error)
        }
    }*/

}

export default OrdenesContr