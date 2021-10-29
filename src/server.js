
const express = require('express')
const cfg = require('./lib/constants.js')
const { routerProductos } = require("./routes/routerProductos.js")
const { routerCarrito } = require("./routes/routerCarrito.js")

/**** VARIABLES ****/
const PORT = process.env.PORT || cfg.DEFAULT_PORT

/**** Inicio App ****/
const app = express()

// Middleware incio
app.use(express.json())
app.use('/', express.static('src/public'))
app.use(express.urlencoded({extended: true}))

// Routers
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

// Middleware Errores
app.use((req, res, next) => {
    next({
        code: cfg.ROUTE_NOT_FOUND_ERRCODE,
        httpStatusCode: cfg.HTTP_NOT_FOUND,
        message: `ruta '${req.originalUrl}' metodo '${req.method}' no implementada`
    });
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    const { httpStatusCode = cfg.HTTP_SERVER_ERROR } = err
    res.status(httpStatusCode).json({
        error: err.code,
        description: err.message
    });
})

// Inicio server
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.error(`Error en servidor ${error}`))