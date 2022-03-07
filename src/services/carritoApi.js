import { CarritoDao } from '../dao/index.js'
import ProductosApi from './productoApi.js'
import CarritoDto from '../model/CarritoDto.js'
import { ErrorCarritoNoEncontrado } from '../lib/errors.js'


class CarritoApi {
    constructor(){
        this.carritos = new CarritoDao()
        this.productoApi = new ProductosApi()
    }

    async save(){
        const carrito = await this.carritos.save({ timestamp: Date.now(), productos: [] })
        return CarritoDto.asDto(carrito)
    }

    async delete(id){
        const carrito = await this.carritos.deleteById(id)
        if (carrito == null) {
            throw new ErrorCarritoNoEncontrado()
        }
    }

    async get(id = null){
        if (id) {
            const carrito = await this.carritos.getById(id)
            if (carrito == null){
                throw new ErrorCarritoNoEncontrado()
            }
            const productosPromises = carrito.productos.map(async p => { 
                return {
                    producto: await this.productoApi.get(p.id),
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
            const carritos = await this.carritos.getAll()

            const carritosPromises = carritos.map(async carrito => {
                const productosPromises = carrito.productos.map(async p => { 
                    return {
                        producto: await this.productoApi.get(p.id),
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

    async add(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new ErrorCarritoNoEncontrado()
        }
        const foundIndex = carrito.productos.findIndex(x => x.id == idProducto);
        if (foundIndex > -1) {
            const item = carrito.productos[foundIndex]
            item.cantidad = item.cantidad ? item.cantidad + 1 : 1
            carrito.productos[foundIndex] = item
        } else {
            const producto = await this.productoApi.get(idProducto)
            carrito.productos.push({ id: producto.id, cantidad: 1 })
        }
        await this.carritos.saveById(carrito, idCarrito)
    }

    async remove(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new ErrorCarritoNoEncontrado()
        }
        carrito.productos = carrito.productos.filter(prod => prod.id != idProducto)
        await this.carritos.saveById(carrito, idCarrito)
    }

    // Solo para testeo
    async deleteAll(){
        await this.carritos.deleteAll()
    }
}

export default CarritoApi;