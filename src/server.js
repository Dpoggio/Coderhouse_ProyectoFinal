import cfg from './config.js'
import logger from './lib/logger.js'
import os from 'os'
import cluster from 'cluster'
import express from 'express'
import passport from 'passport'
import { Server as HttpServer } from 'http'
import swaggerUI from 'swagger-ui-express'


/*** Inicio APP ***/
if (cfg.CLUSTER && cluster.isPrimary) {
    const numCPUs = os.cpus().length

    logger.info(`App Iniciada [Modo: CLUSTER]: Cantidad de Cpus [${ numCPUs }]`)

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
      logger.info('Creando un nuevo Worker...')
    }

    cluster.on('exit', worker => {
      logger.info(`Worker ${worker.process.pid} caido`)
      cluster.fork()
    })
    
} else {
    logger.info(`App Iniciada [Modo: FORK]. PID: ${ process.pid }]`)
    
    
    const WebSocket = (await import('./lib/WebSocket.js')).default
    const { routes } = await import('./routes/routes.js')
    const { handleErrors } = await import('./routes/routerError.js')
    const { swaggerDocs } = await import('./lib/swagger.js')
    

    /**** VARIABLES ****/
    const PORT = cfg.PORT

    /**** Inicio App ****/
    const app = express()
    const httpServer = new HttpServer(app)
    WebSocket.initialize(httpServer)

    app.set('views', 'src/views');
    app.set('view engine', 'ejs');

    // Middleware incio
    app.use("/swagger-ui", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
    app.use(express.json())
    app.use('/', express.static('src/public'))
    app.use(express.urlencoded({extended: true}))
    app.use(logger.expressLogMiddleware)
    app.use(passport.initialize())

    // Routers
    app.use('/', routes)
    app.use(handleErrors)

    // Inicio server
    const server = httpServer.listen(PORT, () => logger.info(`Servidor HTTP escuchando en el puerto ${server.address().port}`))
    server.on("error", error => logger.error(`Error en servidor ${error}`))
}