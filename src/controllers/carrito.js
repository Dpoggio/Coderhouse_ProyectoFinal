const Contenedor = require('../lib/contenedor.js')
const Productos = require('./productos.js')
const cfg = require('../lib/constants.js')

/**** Constantes ****/
const ARCHIVO_CARRITO = './DB/carritos.txt'

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
        const listaProductos = []
        console.log(carrito.productos)
        for (const id of carrito.productos){
            console.log(id)
            const prod = await this.productoController.get(id)
            listaProductos.push(prod)
        }
        return listaProductos
    }

    async add(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new CarritoNoEncontrado()
        }
        const producto = await this.productoController.get(idProducto)
        carrito.productos.push(producto.id)
        await this.carritos.saveById(carrito, idCarrito)
    }

    async remove(idCarrito, idProducto){
        const carrito = await this.carritos.getById(idCarrito)        
        if (carrito == null){
            throw new CarritoNoEncontrado()
        }
        carrito.productos = carrito.productos.filter(id => id != idProducto);
        await this.carritos.saveById(carrito, idCarrito)
    }
}

module.exports = Carrito;