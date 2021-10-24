const Contenedor = require('../utils/contenedor.js')
const Productos = require('./productos.js')

/**** Constantes ****/
const ARCHIVO_CARRITO = './DB/carritos.txt'

/**** Helpers ****/
class CarritoNoEncontrado extends Error {
    constructor() {
        super('carrito no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = 404
        Error.captureStackTrace(this, this.constructor)
    }
}

class Carrito {
    constructor(){
        this.carritos = new Contenedor(ARCHIVO_CARRITO)
        this.productoController = new Productos()
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
        return carrito.productos
    }

    async add(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new CarritoNoEncontrado()
        }
        const producto = await this.productoController.get(idProducto)
        carrito.productos.push(producto)
        await this.carritos.saveById(carrito, idCarrito)
    }

    async remove(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new CarritoNoEncontrado()
        }
        carrito.productos = carrito.productos.filter(prod => prod.id != idProducto);
        await this.carritos.saveById(carrito, idCarrito)
    }
}

module.exports = Carrito;