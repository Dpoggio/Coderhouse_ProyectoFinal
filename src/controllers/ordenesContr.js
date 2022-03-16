import cfg from '../config.js'
import NotificationApi from '../services/notificationApi.js'
import UsuarioApi from '../services/usuarioApi.js'
import { ErrorFormatoIncorrecto, ErrorOrdenSinItems } from '../lib/errors.js'
import OrdenApi from '../services/ordenApi.js'
import BaseController from './baseController.js'

class OrdenesContr extends BaseController {
    static ServiceApi = OrdenApi
    
    static async post(req, res, next) {  
        
        try {
            if (!req.body.usuario || !req.body.usuario.id ) {
                throw new ErrorFormatoIncorrecto('Campo "usuario.id" requerido')
            }
            if (req.body.items.length == 0) {
                throw new ErrorOrdenSinItems()
            }
            const idUsuario = req.body.usuario.id
            const usuario = await UsuarioApi.get(idUsuario)
            const orden = await OrdenApi.save(req.body)
            NotificationApi.notificateNewOrder(orden, usuario)
            NotificationApi.notificateNewOrderToUser(orden, usuario)
            res.status(cfg.HTTP_CREATED).json(orden)
        } catch (error) {
            next(error)
        }
    }

}

export default OrdenesContr