import cfg from '../../config.js'
const MensajeDao = (await import(`./mensajeDao${cfg.DAO_ENTITIES.MENSAJE}.js`)).default

let dao = new MensajeDao()
await dao.init()

export default class MensajeDaoFactory {
    static getDao() {
        return dao
    }
}