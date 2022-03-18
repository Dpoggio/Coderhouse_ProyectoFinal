import { Server as IOServer } from 'socket.io'
import logger from './logger.js'
import { verifyAndGetUser } from './auth.js';
import ChatWsContr from '../controllers/chatContr.js';
import { ErrorTokenInvalido } from '../lib/errors.js'

/**
 * Valida que el token del usuario aun sea valido. En caso contrario, 
 * emite un evento invalidToken sobre el cliente. Esto permite que el 
 * cliente pueda volver a solicitar un refresco del token.
 */
export function validateAndGetUser(socket, token){
    try {
        const user = verifyAndGetUser(token)
        return user
    } catch (error) {
        if (error instanceof ErrorTokenInvalido){
            socket.emit('invalidToken')
        } else {
            logger.error(error)
        }
    }
}

export default class WebSocket {    
               
    static initialize(httpServer) {
        const io = new IOServer(httpServer)
        const ioChat = io.of('/ws/chat')
        ioChat.on('connection', (socket) => ChatWsContr.chatConnection(socket, ioChat))
    }

}

