const cfg = require('./constants.js')

const IS_ADMIN = cfg.ADMIN

function auth(req, res, next){
    if(IS_ADMIN) {
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