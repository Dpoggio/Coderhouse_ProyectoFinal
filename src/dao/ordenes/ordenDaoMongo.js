import Contenedor from '../../contenedores/contenedorMongo.js'
import mongoose from 'mongoose'
import cfg from '../../config.js'

const ordenSchema = new mongoose.Schema({
    id: {type: Number },
    usuario: {
        id: {type: Number },
    },
    items: [{
        cantidad: {type: Number},
        producto: {
            name: {type: String},
            description: {type: String},
            code: {type: Number},
            thumbnail: {type: String},
            price: {type: Number},
        }
    }],
    status: {type: String},
    timestamp: {type: Date }
})


class OrdenDaoMongo extends Contenedor{
    constructor(){
        const mongoUri = cfg.mongoDbURL
        const ordenes = mongoose.model('ordenes', ordenSchema)
        super(ordenes, mongoUri)
    }
}

export default OrdenDaoMongo