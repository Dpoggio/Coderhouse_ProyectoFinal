import ProductosApi from '../services/productoApi.js'
import parser from '../lib/idParser.js'
import cfg from '../config.js'

const productoApi = new ProductosApi()

/**** Rutas ****/
class ProductoContr {

    static async get(req, res, next){  
        try {
            const listaProductos = await productoApi.get()
            res.json(listaProductos)    
        } catch (error) {
            next(error)
        }
    } 

    static async getById(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const producto = await productoApi.get(id)
            res.json(producto)    
        } catch (error) {
            return next(error)
        }
    }

    static async post(req, res, next) {  
        try {
            const producto = await productoApi.save(req.body)
            res.status(cfg.HTTP_CREATED).json(producto)
        } catch (error) {
            next(error)
        }
    }

    static async put(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const producto = await productoApi.save(req.body, id)
            res.json(producto)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            await productoApi.delete(id)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

}

export default ProductoContr