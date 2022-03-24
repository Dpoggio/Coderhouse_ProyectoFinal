import ProductoDao from '../dao/productos/productoDaoFactory.js'
import ProductoDto from '../model/response/productoDto.js'
import { ErrorProductoNoEncontrado } from '../lib/errors.js'
import BaseApi from './baseApi.js'


class ProductoApi  extends BaseApi {
    static ErrorBaseNoEncontrado = ErrorProductoNoEncontrado
    static BaseDao = ProductoDao
    static BaseDto = ProductoDto


}

export default ProductoApi;