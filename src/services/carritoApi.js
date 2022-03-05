import { CarritoDao } from '../dao/index.js'
import ProductosApi from './productoApi.js'
import cfg from '../config.js'


/**** Helpers ****/
class CarritoNoEncontrado extends Error {
    constructor() {
        super('carrito no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = cfg.CHRT_NOT_FOUND_ERRCODE
        Error.captureStackTrace(this, this.constructor)
    }
}

class CarritoApi {
    constructor(){
        this.carritos = new CarritoDao()
        this.productoController = new ProductosApi()
    }

    async save(){
        const carrito = await this.carritos.save({ timestamp: Date.now(), productos: [] })
        return carrito.id
    }

    async delete(id){
        const carrito = await this.carritos.deleteById(id)
        if (carrito == null) {
            throw new CarritoNoEncontrado()
        }
    }

    async get(id){
        const carrito = await this.carritos.getById(id)
        if (carrito == null){
            throw new CarritoNoEncontrado()
        }
        const promises = carrito.productos.map(async p => { 
            return {
                id: carrito.id,
                timestamp: carrito.timestamp,
                producto: await this.productoController.get(p.id)
            }
        })
                
        return Promise.all(promises)
    }

    async add(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new CarritoNoEncontrado()
        }
        const producto = await this.productoController.get(idProducto)
        carrito.productos.push({ id: producto.id })
        await this.carritos.saveById(carrito, idCarrito)
    }

    async remove(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new CarritoNoEncontrado()
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