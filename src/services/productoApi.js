import { ProductoDao } from '../dao/index.js'
import ProductoDto from '../model/productoDto.js'
import cfg from '../config.js'


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

class ProductoApi {
    constructor(){
        this.productos = new ProductoDao()
    }

    async get(id = null){
        if (id === null){
            return ProductoDto.asDto(await this.productos.getAll(id))
        } else {
            const producto = await this.productos.getById(id)
            if (producto == null){
                throw new ProductoNoEncontrado()
            }
            return ProductoDto.asDto(producto)
        }
    }

    async save(producto, id = null){
        producto.timestamp = Date.now()
        if (id === null){
            return ProductoDto.asDto(await this.productos.save(producto))
        } else {
            const nuevoProducto = await this.productos.saveById(producto, id)
            if (nuevoProducto == null){
                throw new ProductoNoEncontrado()
            }
            return ProductoDto.asDto(nuevoProducto)
        }
    }

    async delete(id){
        const producto = await this.productos.deleteById(id)
        if (producto == null) {
            throw new ProductoNoEncontrado()
        }
    }
}

export default ProductoApi;