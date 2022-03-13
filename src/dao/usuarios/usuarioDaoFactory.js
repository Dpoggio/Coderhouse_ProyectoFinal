import cfg from '../../config.js'
const UsuarioDao = (await import(`./usuarioDao${cfg.DAO_ENTITIES.USUARIO}.js`)).default

let dao = new UsuarioDao()
await dao.init()

export default class UsuarioDaoFactory {
    static getDao() {
        return dao
    }
}