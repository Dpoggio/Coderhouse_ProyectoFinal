const Contenedor = require('../lib/contenedor.js')
const ProductosContr = require('./productos.js')
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

class CarritoContr {
    constructor(){
        this.carritos = new Contenedor(ARCHIVO_CARRITO)
        this.productoController = new ProductosContr()
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
        for (const p of carrito.productos){
            const prod = await this.productoController.get(p.id)
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
}

module.exports = CarritoContr;