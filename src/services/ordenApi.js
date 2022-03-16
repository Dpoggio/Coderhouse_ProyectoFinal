import OrdenDao from '../dao/ordenes/ordenDaoFactory.js'
import OrdenDto from '../model/ordenDto.js'
import { ErrorOrdenNoEncontrada, ErrorOrdenEstadoNoValido } from '../lib/errors.js'
import BaseApi from './baseApi.js'
import UsuarioApi from './usuarioApi.js'

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

    static async save(orden, id = null){
        orden.timestamp = new Date()
        let nuevaOrden = null
        let order_mail = null
        if (id === null){
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

}

export default OrdenApi;