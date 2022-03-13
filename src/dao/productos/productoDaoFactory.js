import cfg from '../../config.js'
const ProductoDao = (await import(`./productoDao${cfg.DAO_ENTITIES.PRODUCTO}.js`)).default

let dao = new ProductoDao()
await dao.init()

export default class ProductoDaoFactory {
    static getDao() {
        return dao
    }
}