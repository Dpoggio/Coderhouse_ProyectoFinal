const Contenedor = require('../utils/contenedor.js')

/**** Constantes ****/
const ARCHIVO_PRODUCTOS = './DB/productos.txt'

/**** Excepciones ****/
class ProductoNoEncontrado extends Error {
    constructor() {
        super('producto no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = 404
        Error.captureStackTrace(this, this.constructor)
    }
}

class Producto {
    constructor(){
        this.productos = new Contenedor(ARCHIVO_PRODUCTOS)
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

    async save(object, id = null){
        if (id === null){
            return await this.productos.save(object)
        } else {
            const producto = await this.productos.saveById(object, id)
            if (producto == null){
                throw new ProductoNoEncontrado()
            }
            return producto
        }
    }

    async delete(id){
        const producto = await this.productos.deleteById(id)
        if (producto == null) {
            throw new ProductoNoEncontrado()
        }
    }
}

module.exports = Producto;