import cfg from '../config.js'
import NotificationApi from '../services/notificationApi.js'
import UsuarioApi from '../services/usuarioApi.js'
import { ErrorFormatoIncorrecto, ErrorOrdenSinItems, ErrorUsuarioNoAutorizado } from '../lib/errors.js'
import OrdenApi from '../services/ordenApi.js'
import BaseController from './baseController.js'
import parser from '../lib/idParser.js'

class OrdenesContr extends BaseController {
    static ServiceApi = OrdenApi

    static async getByUser(req, res, next) {  
        try {
            const idUsuario = parser.parseID(req.params.id)
            const usuario = await UsuarioApi.get(idUsuario)
            if (!req.user || req.user.id != usuario.id){
                throw new ErrorUsuarioNoAutorizado()
            }
            const ordenes = await OrdenApi.getByUser(idUsuario)
            res.json(ordenes)    
        } catch (error) {
            return next(error)
        }
    }
    
    
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