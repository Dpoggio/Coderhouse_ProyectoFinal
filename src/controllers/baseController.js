import parser from '../lib/idParser.js'
import cfg from '../config.js'


/**** Rutas ****/
class BaseController {

    static ServiceApi = undefined

    static async get(req, res, next){  
        try {
            const listaElementos = await this.ServiceApi.get()
            res.json(listaElementos)    
        } catch (error) {
            next(error)
        }
    } 

    static async getById(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const elemento = await this.ServiceApi.get(id)
            res.json(elemento)    
        } catch (error) {
            return next(error)
        }
    }

    static async post(req, res, next) {  
        try {
            const elemento = await this.ServiceApi.save(req.body)
            res.status(cfg.HTTP_CREATED).json(elemento)
        } catch (error) {
            next(error)
        }
    }

    static async put(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const elemento = await this.ServiceApi.save(req.body, id)
            res.json(elemento)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            await this.ServiceApi.delete(id)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

}

export default BaseController