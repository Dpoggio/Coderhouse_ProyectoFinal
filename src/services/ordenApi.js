import OrdenDao from '../dao/ordenes/ordenDaoFactory.js'
import OrdenDto from '../model/ordenDto.js'
import { ErrorOrdenNoEncontrada, ErrorOrdenEstadoNoValido, ErrorStockInsuficiente } from '../lib/errors.js'
import BaseApi from './baseApi.js'
import UsuarioApi from './usuarioApi.js'
import ProductoApi from './productoApi.js'

const ORDEN_ESTADOS = {
    GENERADA: "GENERADA",
    EN_PROGRESO: "EN PROGRESO",
    ENVIADA: "ENVIADA",
    ENTREGADA: "ENTREGADA",
}


class OrdenApi extends BaseApi {
    static ErrorBaseNoEncontrado = ErrorOrdenNoEncontrada
    static BaseDao = OrdenDao
    static BaseDto = OrdenDto

    static validarEstado(status){
        if (!Object.values(ORDEN_ESTADOS).includes(status)) {
            throw new ErrorOrdenEstadoNoValido()
        }
        return
    }

    static validarStock(orden){
        orden.items.forEach(item => {
            if (item.cantidad > item.producto.stock) {
                throw new ErrorStockInsuficiente()
            }
        })
    }

    static async get(id = null){
        if (id === null){
            const ordenes = await OrdenDao.getDao().getAll(id)
            const ordenesPromises = ordenes.map(async orden => {
                orden.mail = (await UsuarioApi.get(orden.usuario.id)).username 
                return orden
            })
            return OrdenDto.asDto(await Promise.all(ordenesPromises))
        } else {
            const orden = await OrdenDao.getDao().getById(id)
            if (orden == null){
                throw new ErrorOrdenNoEncontrada()
            }
            orden.mail = (await UsuarioApi.get(orden.usuario.id)).username
            return OrdenDto.asDto(orden)
        }
    }

    static async save(data, id = null){
        const orden = data
        orden.timestamp = new Date()
        let nuevaOrden = null
        let order_mail = null
        if (id === null){
            orden.items = await Promise.all(
                data.items.map(async item => {
                    return {
                        cantidad: item.cantidad,
                        producto: await ProductoApi.get(item.producto.id)
                    }
                })
            )
            OrdenApi.validarStock(orden)
            order_mail = (await UsuarioApi.get(orden.usuario.id)).username
            orden.status = ORDEN_ESTADOS.GENERADA
            nuevaOrden = await OrdenDao.getDao().save(orden)
        } else {
            OrdenApi.validarEstado(orden.status)
            const ordenVieja = await OrdenDao.getDao().getById(id)
            if (ordenVieja == null){
                throw new ErrorOrdenNoEncontrada()
            }
            order_mail = (await UsuarioApi.get(ordenVieja.usuario.id)).username
            ordenVieja.status = orden.status
            ordenVieja.timestamp = orden.timestamp
            nuevaOrden = await OrdenDao.getDao().saveById(ordenVieja, id)
        }
        nuevaOrden.mail = order_mail
        return OrdenDto.asDto(nuevaOrden)
    }

    static async getByUser(idUsuario){
        const ordenes = await OrdenDao.getDao().getByProperty('usuario.id', idUsuario)
        const ordenesPromises = ordenes.map(async orden => {
            orden.mail = (await UsuarioApi.get(orden.usuario.id)).username 
            return orden
        })
        return OrdenDto.asDto(await Promise.all(ordenesPromises))
    }


}

export default OrdenApi;