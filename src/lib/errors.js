import cfg from '../config.js'

// Libreria de errores HTTP personalizados
const RUOUTE_UNAUTH = -1
const ROUTE_NOT_FOUND = -2
const INVALID_ID = -3
const PROD_NOT_FOUND = -4
const CHRT_NOT_FOUND = -5
const USER_NOT_FOUND = -6
const USER_DUP = -7
const INVALID_USER = -8
const AUTH_REQUIRED = -9
const INVALID_TOKEN = -10
const INCORRECT_FORMAT = -11
const MSG_NOT_FOUND = -12
const ORDER_NOT_FOUND = -13
const ORDER_STATUS_INVALID = -14
const ORDER_WITHOUT_ITEMS = -15
const USER_NOT_AUTHORIZED = -16
const INSUFICIENT_STOCK = -17


export class ErrorRutaNoAutorizada extends Error {
    constructor(path, method) {
        super(`ruta '${path}' metodo '${method}' no autorizada`)
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_FORBIDDEN
        this.code = RUOUTE_UNAUTH
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorRutaInexistente extends Error {
    constructor(path, method) {
        super(`ruta '${path}' metodo '${method}' no implementada`)
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = ROUTE_NOT_FOUND,
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorIdNoNumerico extends Error {
    constructor() {
        super('id no numerico')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_BAD_REQUEST
        this.code = INVALID_ID
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorProductoNoEncontrado extends Error {
    constructor() {
        super('producto no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = PROD_NOT_FOUND
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorCarritoNoEncontrado extends Error {
    constructor() {
        super('carrito no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = CHRT_NOT_FOUND
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorUsuarioNoEncontrado extends Error {
    constructor() {
        super('usuario no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = USER_NOT_FOUND
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorUsuarioDuplicado extends Error {
    constructor() {
        super('el usuario ya existe')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_CONFLICT
        this.code = USER_DUP
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorUsuarioInvalido extends Error {
    constructor() {
        super('usuario o password invalido')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_FORBIDDEN
        this.code = INVALID_USER
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorAutenticacionRequerida extends Error {
    constructor() {
        super(`Se requiere autenticacion para acceder a este recurso`)
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_UNAUTHORIZED
        this.code = AUTH_REQUIRED
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorTokenInvalido extends Error {
    constructor() {
        super(`Token invalido o expirado`)
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_FORBIDDEN
        this.code = INVALID_TOKEN
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorFormatoIncorrecto extends Error {
    constructor(mensaje) {
        super(`Formato incorrecto: ${mensaje}`)
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_BAD_REQUEST
        this.code = INCORRECT_FORMAT
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorMensajeNoEncontrado extends Error {
    constructor() {
        super('mensaje no encontrado')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = MSG_NOT_FOUND
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorOrdenNoEncontrada extends Error {
    constructor() {
        super('orden no encontrada')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_NOT_FOUND
        this.code = ORDER_NOT_FOUND
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorOrdenEstadoNoValido extends Error {
    constructor() {
        super('estado no valido para la orden')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_BAD_REQUEST
        this.code = ORDER_STATUS_INVALID
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorOrdenSinItems extends Error {
    constructor() {
        super('orden sin items')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_BAD_REQUEST
        this.code = ORDER_WITHOUT_ITEMS
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorUsuarioNoAutorizado extends Error {
    constructor() {
        super('El usuario no esta autorizado a acceder a este recurso')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_FORBIDDEN
        this.code = USER_NOT_AUTHORIZED
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ErrorStockInsuficiente extends Error {
    constructor() {
        super('No hay stock suficiente para cubrir la cantidad requerida')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_UNPROCESSABLE_ENTITY
        this.code = INSUFICIENT_STOCK
        Error.captureStackTrace(this, this.constructor)
    }
}
