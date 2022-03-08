import { UsuarioDao } from '../dao/index.js'
import UsuarioDto from '../model/usuarioDto.js'
import { ErrorUsuarioNoEncontrado, ErrorUsuarioDuplicado, ErrorUsuarioInvalido } from '../lib/errors.js'
import bCrypt from 'bcrypt'



function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
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
                throw new ErrorUsuarioNoEncontrado()
            }
            return UsuarioDto.asDto(usuario)
        }
    }

    

    async save(usuario, id = null){
        usuario.password = createHash(usuario.password)
        if (id === null){
            const usuariosValidate = await this.usuarios.getByProperty('username',usuario.username)
            if (usuariosValidate.length > 0) {
                throw new ErrorUsuarioDuplicado()
            }
            // Comentario: 
            // No es la manera mas elegante, pero facilita la creacion del usuario administrador para 
            // pruebas en las distintas BD
            usuario.admin = (usuario.username == "admin")
            return UsuarioDto.asDto(await this.usuarios.save(usuario))
        } else {
            const nuevoUsuario = await this.usuarios.saveById(usuario, id)
            if (nuevoUsuario == null){
                throw new ErrorUsuarioNoEncontrado()
            }
            return UsuarioDto.asDto(nuevoUsuario)
        }
    }

    async delete(id){
        const usuario = await this.usuarios.deleteById(id)
        if (usuario == null) {
            throw new ErrorUsuarioNoEncontrado()
        }
    }

    async validateUser(username, password){
        const listaUsuarios = await this.usuarios.getByProperty('username',username)
        if (listaUsuarios.length === 0) {
            throw new ErrorUsuarioNoEncontrado()
        }
        if (listaUsuarios.length > 1) {
            throw new ErrorUsuarioDuplicado()
        }
        const usuario = listaUsuarios[0]
        if (isValidPassword(usuario, password)){
            return UsuarioDto.asDto(usuario)
        } else {
            throw new ErrorUsuarioInvalido()
        }

    }
}

export default UsuarioApi;