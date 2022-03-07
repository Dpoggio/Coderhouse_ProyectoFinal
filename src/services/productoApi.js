import { ProductoDao } from '../dao/index.js'
import ProductoDto from '../model/productoDto.js'
import { ErrorProductoNoEncontrado } from '../lib/errors.js'


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
                throw new ErrorProductoNoEncontrado()
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
                throw new ErrorProductoNoEncontrado()
            }
            return ProductoDto.asDto(nuevoProducto)
        }
    }

    async delete(id){
        const producto = await this.productos.deleteById(id)
        if (producto == null) {
            throw new ErrorProductoNoEncontrado()
        }
    }
}

export default ProductoApi;