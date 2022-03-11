import cfg from '../config.js'
import NotificationApi from '../services/notificationApi.js'

/**** Rutas ****/
class OrdenesContr {
    
    static async post(req, res, next) {  
        try {
            const orden = req.body
            NotificationApi.notificateNewOrder(orden)
            res.status(cfg.HTTP_CREATED).json(orden)
        } catch (error) {
            next(error)
        }
    }

}

export default OrdenesContr