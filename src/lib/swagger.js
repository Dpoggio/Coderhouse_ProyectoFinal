import swaggerJsDocs from 'swagger-jsdoc'
import cfg from '../config.js'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.4",
            title: "CoderHouse - Proyecto Final - E-Commerce",
            description: "Proyecto Final del curso de Backend de CoderHouse",
            contact: {
                name: "Demian Poggio"
            },
            servers: [`http://localhost:${cfg.PORT}`]
        },
    }, 
    apis: [
        "./src/routes/routerError.js",
        "./src/routes/routerAuth.js",
        "./src/routes/routerProductos.js",
        "./src/routes/routerCarrito.js",
        "./src/routes/routerUsuarios.js",
        "./src/routes/routerMensajes.js",
        "./src/routes/routerOrdenes.js",
    ]
}
const swaggerDocs = swaggerJsDocs(swaggerOptions)

export { swaggerDocs }