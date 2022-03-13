import CarritoApi from '../services/carritoApi.js'
import parser from '../lib/idParser.js'
import BaseController from './baseController.js'

/**** Rutas ****/
class CarritoContr extends BaseController {
  
    static ServiceApi = CarritoApi

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