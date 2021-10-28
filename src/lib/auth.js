const cfg = require('./constants.js')
const basicAuth = require('basic-auth')

const IS_ADMIN = cfg.ADMIN

function auth(req, res, next){
    const credentials = basicAuth(req)
    if(IS_ADMIN || (credentials && credentials.name == "admin")) {
        next();
    } else {
        next({
            code: cfg.NOT_AUTH_ERRCODE,
            httpStatusCode: cfg.HTTP_NOT_AUTHORIZED,
            message: `ruta '${req.originalUrl}' metodo '${req.method}' no authorizada`
        })
    }
}

module.exports = { auth }