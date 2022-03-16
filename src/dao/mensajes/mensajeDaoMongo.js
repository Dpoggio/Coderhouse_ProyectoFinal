import Contenedor from '../../contenedores/contenedorMongo.js'
import mongoose from 'mongoose'
import cfg from '../../config.js'

const mensajeSchema = new mongoose.Schema({
    id: {type: Number },
    usuario: {
        id: {type: Number }
    },
    type: {type: String},
    text: {type: String },
    timestamp: {type: Date }
})


class MensajeDaoMongo extends Contenedor{
    constructor(){
        const mongoUri = cfg.mongoDbURL
        const mensajes = mongoose.model('mensajes', mensajeSchema)
        super(mensajes, mongoUri)
    }
}

export default MensajeDaoMongo