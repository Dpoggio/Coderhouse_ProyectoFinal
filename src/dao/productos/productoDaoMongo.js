import Contenedor from '../../contenedores/contenedorMongo.js'
import conn from '../../lib/connections.js'
import mongoose from 'mongoose'

const productoSchema = new mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    description: {type: String},
    code: {type: Number},
    thumbnail: {type: String},
    price: {type: Number},
    stock: {type: Number},
    timestamp: {type: Date},
})

class ProductoDaoMongo extends Contenedor{
    constructor(){
        const productos = mongoose.model('productos', productoSchema)
        super(productos)
    }
}

export default ProductoDaoMongo