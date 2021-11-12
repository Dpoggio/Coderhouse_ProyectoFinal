const Contenedor = require('../contenedores/contenedor.js')
const cfg = require('../lib/constants.js')

/**** Constantes ****/
const ARCHIVO_PRODUCTOS = './DB/productos.txt'

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
        const producto = await this.productos.deleteById(id)
        if (producto == null) {
            throw new ProductoNoEncontrado()
        }
    }
}

module.exports = ProductoContr;