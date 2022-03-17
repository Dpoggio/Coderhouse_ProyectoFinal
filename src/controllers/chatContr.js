
import logger from '../lib/logger.js'
import MensajeApi from '../services/MensajeApi.js'
import { validateAndGetUser } from '../lib/WebSocket.js'

export default class ChatWsContr {

    static async chatConnection(socket, io){
        try {
            const token = socket.handshake.query.token
            const user = validateAndGetUser(socket, token)
            if (user) {
                logger.info('Nuevo cliente conectado')
                socket.emit('actualizarMensajes', await ChatWsContr.obtenerMensajes())
                socket.on('nuevoMensaje', async (data, token) => await ChatWsContr.nuevoMensaje(data, token, socket, io))
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async nuevoMensaje(data, token, userSocket, ioBroadcast){
        try {
            const user = validateAndGetUser(userSocket, token)
            if (user) {   
                await MensajeApi.save(data, user.id) 
                ioBroadcast.emit('actualizarMensajes', await MensajeApi.get())
            }
        } catch (error) {
            logger.error(error.message)
        }
    }

    static async obtenerMensajes(){
        return await MensajeApi.get() 
    }
}