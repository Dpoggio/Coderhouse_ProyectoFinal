import { Server as IOServer } from 'socket.io'
import logger from './logger.js'
import { getUser } from './auth.js';
import ChatWsContr from '../controllers/chatContr.js';
import { ErrorTokenInvalido } from '../lib/errors.js'

export function validateAndGetUser(socket, token){
    try {
        const user = getUser(token)
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

