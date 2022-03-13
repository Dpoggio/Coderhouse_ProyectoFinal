import ProductoApi from '../services/ProductoApi.js'
import parser from '../lib/idParser.js'
import cfg from '../config.js'


/**** Rutas ****/
class ProductoContr {

    static async get(req, res, next){  
        try {
            const listaProductos = await ProductoApi.get()
            res.json(listaProductos)    
        } catch (error) {
            next(error)
        }
    } 

    static async getById(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const producto = await ProductoApi.get(id)
            res.json(producto)    
        } catch (error) {
            return next(error)
        }
    }

    static async post(req, res, next) {  
        try {
            const producto = await ProductoApi.save(req.body)
            res.status(cfg.HTTP_CREATED).json(producto)
        } catch (error) {
            next(error)
        }
    }

    static async put(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const producto = await ProductoApi.save(req.body, id)
            res.json(producto)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            await ProductoApi.delete(id)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

}

export default ProductoContr