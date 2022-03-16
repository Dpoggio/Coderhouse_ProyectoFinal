import MensajeDao from '../dao/mensajes/mensajeDaoFactory.js'
import MensajeDto from '../model/mensajeDto.js'
import { ErrorMensajeNoEncontrado } from '../lib/errors.js'
import BaseApi from './baseApi.js'
import UsuarioApi from './usuarioApi.js'


class MensajeApi extends BaseApi {
    static ErrorBaseNoEncontrado = ErrorMensajeNoEncontrado
    static BaseDao = MensajeDao
    static BaseDto = MensajeDto

    static async save(mensaje, idUsuario){
        mensaje.timestamp = new Date()
        const usuario = await UsuarioApi.get(idUsuario)
        mensaje.usuario = {
            id: usuario.id
        }

        const nuevoMensaje = await MensajeDao.getDao().save(mensaje)
        nuevoMensaje.mail = usuario.username
        return MensajeDto.asDto(nuevoMensaje)
    }

    static async get(id = null){
        if (id === null){
            const mensajes = await MensajeDao.getDao().getAll(id)
            const mensajesPromises = mensajes.map(async mensaje => {
                mensaje.mail = (await UsuarioApi.get(mensaje.usuario.id)).username 
                return mensaje
            })
            return MensajeDto.asDto(await Promise.all(mensajesPromises))
        } else {
            const mensaje = await MensajeDao.getDao().getById(id)
            if (mensaje == null){
                throw new ErrorMensajeNoEncontrado()
            }
            mensaje.mail = (await UsuarioApi.get(mensaje.usuario.id)).username
            return MensajeDto.asDto(mensaje)
        }
    }

}

export default MensajeApi;