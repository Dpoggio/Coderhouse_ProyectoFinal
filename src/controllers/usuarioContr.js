import UsuarioApi from '../services/usuarioApi.js'
import parser from '../lib/idParser.js'
import cfg from '../config.js'

/**** Rutas ****/
class UsuarioContr {

    static async get(req, res, next){  
        try {
            const listaUsuarios = await UsuarioApi.get()
            res.json(listaUsuarios)    
        } catch (error) {
            next(error)
        }
    } 

    static async getById(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const usuario = await UsuarioApi.get(id)
            res.json(usuario)    
        } catch (error) {
            return next(error)
        }
    }

    static async post(req, res, next) {  
        try {
            const usuario = await UsuarioApi.save(req.body)
            res.status(cfg.HTTP_CREATED).json(usuario)
        } catch (error) {
            next(error)
        }
    }

    static async put(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            const usuario = await UsuarioApi.save(req.body, id)
            res.json(usuario)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {  
        try {
            const id = parser.parseID(req.params.id)
            await UsuarioApi.delete(id)
            res.json({})
        } catch (error) {
            next(error)
        }
    }

}

export default UsuarioContr