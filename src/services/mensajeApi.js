import MensajeDao from '../dao/mensajes/mensajeDaoFactory.js'
import MensajeDto from '../model/mensajeDto.js'
import { ErrorMensajeNoEncontrado } from '../lib/errors.js'
import BaseApi from './baseApi.js'


class MensajeApi extends BaseApi {
    static ErrorBaseNoEncontrado = ErrorMensajeNoEncontrado
    static BaseDao = MensajeDao
    static BaseDto = MensajeDto


}

export default MensajeApi;