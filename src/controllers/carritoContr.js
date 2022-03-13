import CarritoApi from '../services/carritoApi.js'
import parser from '../lib/idParser.js'
import cfg from '../config.js'

/**** Rutas ****/
class CarritoContr {
    static async post(req, res, next){  
        try {
            const carrito = await CarritoApi.save()
            res.status(cfg.HTTP_CREATED).json(carrito)
        } catch (error) {
            next(error)
        }
    }

    static async deleteById(req, res, next){  
        try {
            const id = parser.parseID(req.params.id)
            await CarritoApi.delete(id)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

    static async get(req, res, next){  
        try {
            const carritos = await CarritoApi.get()
            res.json(carritos)    
        } catch (error) {
            return next(error)
        }
    }

    static async getById(req, res, next){  
        try {
            const id = parser.parseID(req.params.id)
            const carrito = await CarritoApi.get(id)
            res.json(carrito)    
        } catch (error) {
            return next(error)
        }
    }

    static async postProductById(req, res, next){  
        try {
            const idCarrito = parser.parseID(req.params.id)
            const idProducto = parser.parseID(req.params.id_prod)
            await CarritoApi.add(idCarrito, idProducto)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductById(req, res, next){  
        try {
            const idCarrito = parser.parseID(req.params.id)
            const idProducto = parser.parseID(req.params.id_prod)
            await CarritoApi.remove(idCarrito, idProducto)
            res.json({})
        } catch (error) {
            next(error)
        }
    }


    // Solo para testeo
    static async deleteAll(req, res, next){  
        try {
            await CarritoApi.deleteAll()
            res.json({})
        } catch (error) {
            next(error)
        }
    }
}

export default CarritoContr