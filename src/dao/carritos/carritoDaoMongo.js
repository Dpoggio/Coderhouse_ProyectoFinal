import Contenedor from '../../contenedores/contenedorMongo.js'
import mongoose from 'mongoose'
import cfg from '../../config.js'

const carritoSchema = new mongoose.Schema({
    id: {type: Number},
    timestamp: {type: Date},
    productos: {type: Array},
})



class CarritoDaoMongo extends Contenedor{
    constructor(){
        const mongoUri = cfg.mongoDbURL
        const carritos = mongoose.model('carritos', carritoSchema)
        super(carritos, mongoUri)
    }
}

export default CarritoDaoMongo