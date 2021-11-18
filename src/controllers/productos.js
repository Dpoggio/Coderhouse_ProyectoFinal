import { ProductoDao } from '../dao/index.js'
import cfg from '../lib/constants.js'


/**** Excepciones ****/
class ProductoNoEncontrado extends Error {
    constructor() {
        super('producto no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = cfg.PROD_NOT_FOUND_ERRCODE
        Error.captureStackTrace(this, this.constructor)
    }
}

class ProductoContr {
    constructor(){
        this.productos = new ProductoDao()
    }

    async get(id = null){
        if (id === null){
            return await this.productos.getAll(id)
        } else {
            const producto = await this.productos.getById(id)
            if (producto == null){
                throw new ProductoNoEncontrado()
            }
            return producto
        }
    }

    async save(producto, id = null){
        producto.timestamp = Date.now()
        if (id === null){
            return await this.productos.save(producto)
        } else {
            const nuevoProducto = await this.productos.saveById(producto, id)
            if (nuevoProducto == null){
                throw new ProductoNoEncontrado()
            }
            return nuevoProducto
        }
    }

    async delete(id){
        // Only For Testing:
        // if (id == 0){
        //     await this.productos.deleteAll()
        //     return 
        // }
        const producto = await this.productos.deleteById(id)
        if (producto == null) {
            throw new ProductoNoEncontrado()
        }
    }
}

export default ProductoContr;