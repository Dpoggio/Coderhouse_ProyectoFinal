import MensajeDao from '../dao/mensajes/mensajeDaoFactory.js'
import MensajeDto from '../model/response/mensajeDto.js'
import { ErrorMensajeNoEncontrado, ErrorUsuarioNoEncontrado } from '../lib/errors.js'
import BaseApi from './baseApi.js'
import UsuarioApi from './usuarioApi.js'


class MensajeApi extends BaseApi {
    static ErrorBaseNoEncontrado = ErrorMensajeNoEncontrado
    static BaseDao = MensajeDao
    static BaseDto = MensajeDto

    static async save(mensaje, idUsuario = null){
        if (idUsuario){

            mensaje.timestamp = new Date()
            const usuario = await UsuarioApi.get(idUsuario)
            mensaje.usuario = {
                id: usuario.id
            }
            
            const nuevoMensaje = await MensajeDao.getDao().save(mensaje)
            nuevoMensaje.mail = usuario.username
            return MensajeDto.asDto(nuevoMensaje)
        } else {
            throw new ErrorUsuarioNoEncontrado()
        }
    }

    static async get(id = null){
        if (id === null){
            const mensajes = await MensajeDao.getDao().getAll(id)
            const mensajesPromises = mensajes.map(async mensaje => {
                const usuario = await UsuarioApi.get(mensaje.usuario.id)
                mensaje.mail = usuario.username 
                mensaje.avatar = usuario.imagenurl
                return mensaje
            })
            return MensajeDto.asDto(await Promise.all(mensajesPromises))
        } else {
            const mensaje = await MensajeDao.getDao().getById(id)
            if (mensaje == null){
                throw new ErrorMensajeNoEncontrado()
            }
            const usuario = await UsuarioApi.get(mensaje.usuario.id)
            mensaje.mail = usuario.username 
            mensaje.avatar = usuario.imagenurl
            return MensajeDto.asDto(mensaje)
        }
    }

}

export default MensajeApi;