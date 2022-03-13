import cfg from '../../config.js'
const CarritoDao = (await import(`./carritoDao${cfg.DAO_ENTITIES.CARRITO}.js`)).default

let dao = new CarritoDao()
await dao.init()

export default class CarritoDaoFactory {
    static getDao() {
        return dao
    }
}