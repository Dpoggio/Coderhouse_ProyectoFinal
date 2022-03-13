import ProductoApi from '../services/ProductoApi.js'
import BaseController from './baseController.js'


/**** Rutas ****/
class ProductoContr extends BaseController {
    
    static ServiceApi = ProductoApi

}

export default ProductoContr