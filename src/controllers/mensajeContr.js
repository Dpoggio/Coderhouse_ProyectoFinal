import idParser from '../lib/idParser.js'
import MensajeApi from '../services/mensajeApi.js'
import BaseController from './baseController.js'
import cfg from '../config.js'

/**** Rutas ****/
class MensajeContr extends BaseController {
    
    static ServiceApi = MensajeApi

    static async postByUser(req, res, next) {  
        
        try {
            const idUsuario = idParser.parseID(req.params.idUsuario)
            const nuevoMensaje = await MensajeApi.save(req.body, idUsuario)
            res.status(cfg.HTTP_CREATED).json(nuevoMensaje)
        } catch (error) {
            next(error)
        }
    }
    
}

export default MensajeContr