import UsuarioDao from '../dao/usuarios/usuarioDaoFactory.js'
import UsuarioDto from '../model/response/usuarioDto.js'
import { ErrorUsuarioNoEncontrado, ErrorUsuarioDuplicado, ErrorUsuarioInvalido } from '../lib/errors.js'
import bCrypt from 'bcrypt'
import BaseApi from './baseApi.js';
import UsuarioRequestDto from '../model/request/usuarioRequestDto.js';
import NotificationApi from '../services/notificationApi.js'


function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

class UsuarioApi extends BaseApi {

    static ErrorBaseNoEncontrado = ErrorUsuarioNoEncontrado
    static BaseDao = UsuarioDao
    static BaseDto = UsuarioDto

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
            const nuevoUsuario = UsuarioDto.asDto(await UsuarioDao.getDao().save(usuario))
            NotificationApi.notificateNewUser(nuevoUsuario)
            return nuevoUsuario
        } else {
            const nuevoUsuario = await UsuarioDao.getDao().saveById(usuario, id)
            if (nuevoUsuario == null){
                throw new ErrorUsuarioNoEncontrado()
            }
            return UsuarioDto.asDto(nuevoUsuario)
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

    static async saveGoogleUser(profile){
        const listaUsuarios = await UsuarioDao.getDao().getByProperty('username',profile.email)
        if (listaUsuarios.length > 1) {
            throw new ErrorUsuarioDuplicado()
        }
        if (listaUsuarios.length === 0) {
            const nuevoUsuario = UsuarioRequestDto.fromGoogleProfile(profile)
            return await UsuarioApi.save(nuevoUsuario)
        } else{
            return UsuarioDto.asDto(listaUsuarios[0])
        }
    }

    
}

export default UsuarioApi;