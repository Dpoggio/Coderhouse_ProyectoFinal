import Contenedor from '../../contenedores/contenedorDB.js'
import cfg from '../../config.js'

// Clase auxiliar
class CarritoProductoDaoDB extends Contenedor {
    constructor(){
        super(cfg.sqlite,'carrito_producto')
    }

    async deleteByIdCarrito(id){
        const prodExistentes = await this.getByField("id_carrito", id)
        await Promise.all(prodExistentes.map(p => this.deleteById(p.id)))
    }
}

class CarritoDaoDB extends Contenedor{
    constructor(){
        super(cfg.sqlite,'carritos')
        this.carritoProducto = new CarritoProductoDaoDB()
    }

    // Override metodo save
    async save(objeto){
        delete objeto.productos
        return await super.save(objeto)
    }

    // Override metodo saveById
    async saveById(objeto, id){
        await this.carritoProducto.deleteByIdCarrito(id)

        for (const p of objeto.productos){
            await this.carritoProducto.save({id_carrito: id, id_producto: p.id})
        }
        delete objeto.productos
        return await super.saveById(objeto, id)
    }

    // Override metodo getById
    async getById(id){
        const carrito = await super.getById(id)
        if (carrito){
            const productos = await this.carritoProducto.getByField("id_carrito", id)
            carrito.productos = productos.map(p => { return { id: p.id_producto}})
        }
        return carrito
    }

    // Override metodo deleteById
    async deleteById(id){
        this.carritoProducto.deleteByIdCarrito(id)
        return super.deleteById(id)
    }
}

export default CarritoDaoDB
