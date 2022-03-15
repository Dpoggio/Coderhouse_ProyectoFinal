import cfg from '../../config.js'
const OrdenDao = (await import(`./ordenDao${cfg.DAO_ENTITIES.ORDEN}.js`)).default

let dao = new OrdenDao()
await dao.init()

export default class OrdenDaoFactory {
    static getDao() {
        return dao
    }
}