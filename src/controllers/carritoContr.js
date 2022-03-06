import CarritoApi from '../services/carritoApi.js'
import parser from '../lib/idParser.js'
import cfg from '../config.js'

const carritoApi = new CarritoApi()

/**** Rutas ****/
class CarritoContr {
    static async post(req, res, next){  
        try {
            const id = await carritoApi.save()
            res.status(cfg.HTTP_CREATED).json({ id })
        } catch (error) {
            next(error)
        }
    }

    static async deleteById(req, res, next){  
        try {
            const id = parser.parseID(req.params.id)
            await carritoApi.delete(id)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next){  
        try {
            const id = parser.parseID(req.params.id)
            const productos = await carritoApi.get(id)
            res.json(productos)    
        } catch (error) {
            return next(error)
        }
    }

    static async postProductById(req, res, next){  
        try {
            const idCarrito = parser.parseID(req.params.id)
            const idProducto = parser.parseID(req.params.id_prod)
            await carritoApi.add(idCarrito, idProducto)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductById(req, res, next){  
        try {
            const idCarrito = parser.parseID(req.params.id)
            const idProducto = parser.parseID(req.params.id_prod)
            await carritoApi.remove(idCarrito, idProducto)
            res.json({})
        } catch (error) {
            next(error)
        }
    }


    // Solo para testeo
    static async deleteAll(req, res, next){  
        try {
            await carritoApi.deleteAll()
            res.json({})
        } catch (error) {
            next(error)
        }
    }
}

export default CarritoContr