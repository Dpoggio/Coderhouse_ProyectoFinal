/*** Inicio APP ***/
import express from 'express'
import cfg from './config.js'
import { routes } from './routes/routes.js'
import logger from './lib/logger.js'
import { handleErrors } from './routes/routerError.js'

/**** VARIABLES ****/
const PORT = cfg.PORT

/**** Inicio App ****/
const app = express()

// Middleware incio
app.use(express.json())
app.use('/', express.static('src/public'))
app.use(express.urlencoded({extended: true}))
app.use(logger.expressLogMiddleware)

// Routers
app.use('/', routes)
app.use(handleErrors)

// Inicio server
const server = app.listen(PORT, () => logger.info(`Servidor HTTP escuchando en el puerto ${server.address().port}`))
server.on("error", error => logger.error(`Error en servidor ${error}`))