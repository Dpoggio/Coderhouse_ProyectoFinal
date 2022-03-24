import CarritoDao from '../dao/carritos/carritoDaoFactory.js'
import ProductoApi from './productoApi.js'
import CarritoDto from '../model/response/carritoDto.js'
import { ErrorCarritoNoEncontrado } from '../lib/errors.js'
import BaseApi from './baseApi.js'


class CarritoApi extends BaseApi {
    static ErrorBaseNoEncontrado = ErrorCarritoNoEncontrado
    static BaseDao = CarritoDao
    static BaseDto = CarritoDto

    static async save(){
        const carrito = await CarritoDao.getDao().save({ timestamp: new Date(), productos: [] })
        return CarritoDto.asDto(carrito)
    }

    static async get(id = null){
        if (id) {
            const carrito = await CarritoDao.getDao().getById(id)
            if (carrito == null){
                throw new ErrorCarritoNoEncontrado()
            }
            const productosPromises = carrito.productos.map(async p => { 
                return {
                    producto: await ProductoApi.get(p.id),
                    cantidad: p.cantidad
                }
            })
                    
            // return CarritoDto.asDto(await Promise.all(promises))
            return CarritoDto.asDto({
                id: carrito.id,
                timestamp: carrito.timestamp,
                productos: await Promise.all(productosPromises)
            })
        } else {
            const carritos = await CarritoDao.getDao().getAll()

            const carritosPromises = carritos.map(async carrito => {
                const productosPromises = carrito.productos.map(async p => { 
                    return {
                        producto: await ProductoApi.get(p.id),
                        cantidad: p.cantidad
                    }
                })
                return {
                    id: carrito.id,
                    timestamp: carrito.timestamp,
                    productos: await Promise.all(productosPromises)
                }
            })
            
            return CarritoDto.asDto(await Promise.all(carritosPromises))
            
        }
    }

    static async add(idCarrito, idProducto){
        const carrito = await CarritoDao.getDao().getById(idCarrito)        
        if (carrito == null){
            throw new ErrorCarritoNoEncontrado()
        }
        const foundIndex = carrito.productos.findIndex(x => x.id == idProducto);
        if (foundIndex > -1) {
            const item = carrito.productos[foundIndex]
            item.cantidad = item.cantidad ? item.cantidad + 1 : 1
            carrito.productos[foundIndex] = item
        } else {
            const producto = await ProductoApi.get(idProducto)
            carrito.productos.push({ id: producto.id, cantidad: 1 })
        }
        await CarritoDao.getDao().saveById(carrito, idCarrito)
    }

    static async remove(idCarrito, idProducto){
        const carrito = await CarritoDao.getDao().getById(idCarrito)        
        if (carrito == null){
            throw new ErrorCarritoNoEncontrado()
        }
        carrito.productos = carrito.productos.filter(prod => prod.id != idProducto)
        await CarritoDao.getDao().saveById(carrito, idCarrito)
    }

    // Solo para testeo
    static async deleteAll(){
        await CarritoDao.getDao().deleteAll()
    }
}

export default CarritoApi;