import Contenedor from '../../contenedores/contenedorMongo.js'
import mongoose from 'mongoose'

const carritoSchema = new mongoose.Schema({
    id: {type: Number},
    timestamp: {type: Date},
    productos: {type: Array},
})



class CarritoDaoMongo extends Contenedor{
    constructor(){
        const carritos = mongoose.model('carritos', carritoSchema)
        super(carritos)
    }
}

export default CarritoDaoMongo