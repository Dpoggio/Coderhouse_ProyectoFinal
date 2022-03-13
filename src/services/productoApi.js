import ProductoDao from '../dao/productos/productoDaoFactory.js'
import ProductoDto from '../model/productoDto.js'
import { ErrorProductoNoEncontrado } from '../lib/errors.js'


class ProductoApi {

    static async get(id = null){
        if (id === null){
            return ProductoDto.asDto(await ProductoDao.getDao().getAll(id))
        } else {
            const producto = await ProductoDao.getDao().getById(id)
            if (producto == null){
                throw new ErrorProductoNoEncontrado()
            }
            return ProductoDto.asDto(producto)
        }
    }

    static async save(producto, id = null){
        producto.timestamp = new Date()
        if (id === null){
            return ProductoDto.asDto(await ProductoDao.getDao().save(producto))
        } else {
            const nuevoProducto = await ProductoDao.getDao().saveById(producto, id)
            if (nuevoProducto == null){
                throw new ErrorProductoNoEncontrado()
            }
            return ProductoDto.asDto(nuevoProducto)
        }
    }

    static async delete(id){
        const producto = await ProductoDao.getDao().deleteById(id)
        if (producto == null) {
            throw new ErrorProductoNoEncontrado()
        }
    }
}

export default ProductoApi;