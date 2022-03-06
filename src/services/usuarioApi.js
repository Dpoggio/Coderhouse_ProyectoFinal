import { UsuarioDao } from '../dao/index.js'
import UsuarioDto from '../model/usuarioDto.js'
import cfg from '../config.js'


/**** Excepciones ****/
class UsuarioNoEncontrado extends Error {
    constructor() {
        super('usuario no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = cfg.USER_NOT_FOUND_ERRCODE
        Error.captureStackTrace(this, this.constructor)
    }
}

class UsuarioDuplicado extends Error {
    constructor() {
        super('el usuario ya existe')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_CONFLICT
        this.code = cfg.USER_DUP_ERRCODE
        Error.captureStackTrace(this, this.constructor)
    }
}

class UsuarioApi {
    constructor(){
        this.usuarios = new UsuarioDao()
    }

    async get(id = null){
        if (id === null){
            return UsuarioDto.asDto(await this.usuarios.getAll(id))
        } else {
            const usuario = await this.usuarios.getById(id)
            if (usuario == null){
                throw new UsuarioNoEncontrado()
            }
            return UsuarioDto.asDto(usuario)
        }
    }

    async save(usuario, id = null){
        if (id === null){
            const usuariosValidate = await this.usuarios.getByProperty('username',usuario.username)
            if (usuariosValidate.length > 0) {
                throw new UsuarioDuplicado()
            }
            return UsuarioDto.asDto(await this.usuarios.save(usuario))
        } else {
            const nuevoUsuario = await this.usuarios.saveById(usuario, id)
            if (nuevoUsuario == null){
                throw new UsuarioNoEncontrado()
            }
            return UsuarioDto.asDto(nuevoUsuario)
        }
    }

    async delete(id){
        const usuario = await this.usuarios.deleteById(id)
        if (usuario == null) {
            throw new UsuarioNoEncontrado()
        }
    }
}

export default UsuarioApi;