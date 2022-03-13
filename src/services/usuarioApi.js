import UsuarioDao from '../dao/usuarios/usuarioDaoFactory.js'
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

    static async get(id = null){
        if (id === null){
            return UsuarioDto.asDto(await UsuarioDao.getDao().getAll(id))
        } else {
            const usuario = await UsuarioDao.getDao().getById(id)
            if (usuario == null){
                throw new ErrorUsuarioNoEncontrado()
            }
            return UsuarioDto.asDto(usuario)
        }
    }

    

    static async save(usuario, id = null){
        usuario.password = createHash(usuario.password)
        if (id === null){
            const usuariosValidate = await UsuarioDao.getDao().getByProperty('username',usuario.username)
            if (usuariosValidate.length > 0) {
                throw new ErrorUsuarioDuplicado()
            }
            // Comentario: 
            // No es la manera mas elegante, pero facilita la creacion del usuario administrador para 
            // pruebas en las distintas BD
            usuario.admin = (usuario.username == "admin")
            return UsuarioDto.asDto(await UsuarioDao.getDao().save(usuario))
        } else {
            const nuevoUsuario = await UsuarioDao.getDao().saveById(usuario, id)
            if (nuevoUsuario == null){
                throw new ErrorUsuarioNoEncontrado()
            }
            return UsuarioDto.asDto(nuevoUsuario)
        }
    }

    static async delete(id){
        const usuario = await UsuarioDao.getDao().deleteById(id)
        if (usuario == null) {
            throw new ErrorUsuarioNoEncontrado()
        }
    }

    static async validateUser(username, password){
        const listaUsuarios = await UsuarioDao.getDao().getByProperty('username',username)
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