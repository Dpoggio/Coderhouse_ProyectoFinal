import Contenedor from '../../contenedores/contenedorMongo.js'
import mongoose from 'mongoose'
import cfg from '../../config.js'

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
        const mongoUri = cfg.mongoDbURL
        const productos = mongoose.model('productos', productoSchema)
        super(productos, mongoUri)
    }
}

export default ProductoDaoMongo