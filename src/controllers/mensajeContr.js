import MensajeApi from '../services/MensajeApi.js'
import BaseController from './baseController.js'


/**** Rutas ****/
class MensajeContr extends BaseController {
    
    static ServiceApi = MensajeApi
}

export default MensajeContr