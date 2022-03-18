import { Router } from 'express'
import os from 'os'
import cfg from '../config.js'

const routerInfo = Router();

/**** Rutas ****/
const getSystemParams = (req) => {   
    return [
        { desc: "Argumentos de Entrada", value: process.argv.slice(2) },
        { desc: "Nombre de la plataforma", value: process.platform },
        { desc: "Version de node.js", value: process.version },
        { desc: "Memoria total reservada", value: process.memoryUsage().rss },
        { desc: "Path de ejecucion", value: process.argv[1] },
        { desc: "Process id", value: process.pid },
        { desc: "Carpeta del proyecto", value: process.cwd() },
        { desc: "Cantidad de Procesadores", value: os.cpus().length },
    ]
}

const getUserParams = (req) => {   
    return [
        { desc: 'NODE_ENV', value: process.env.NODE_ENV },
        { desc: 'PORT', value: cfg.PORT },
        { desc: 'CLUSTER', value: cfg.CLUSTER },
        { desc: 'TOKEN_EXP_TIME', value: cfg.TOKEN_EXP_TIME },
        { desc: 'REFRESH_TOKEN_EXP_TIME', value: cfg.REFRESH_TOKEN_EXP_TIME },
        { desc: 'PRODUCTOS_DAO', value: cfg.DAO_ENTITIES.PRODUCTO },
        { desc: 'CARRITOS_DAO', value: cfg.DAO_ENTITIES.CARRITO },
        { desc: 'USUARIOS_DAO', value: cfg.DAO_ENTITIES.USUARIO },
        { desc: 'MENSAJES_DAO', value: cfg.DAO_ENTITIES.MENSAJE },
        { desc: 'ORDENES_DAO', value: cfg.DAO_ENTITIES.ORDEN },
    ]
}

routerInfo.get('/', (req, res) => {
    res.render('info', { 
        systemParams: getSystemParams(req),
        userParams: getUserParams(req)
    })
})

export { routerInfo }