import dotenv from 'dotenv' 
dotenv.config()

const DAO_OPTIONS = {
    FILE: 'Archivos',
    DB: 'DB',
    MONGO: 'Mongo',
    FIREBASE: 'Firebase'
}

export default Object.freeze({
    // Misc
    PORT: process.env.PORT || 8080,
    ADMIN: false,

    // HTTP
    HTTP_NOT_FOUND: 404,
    HTTP_SERVER_ERROR: 500,
    HTTP_CREATED: 201,
    HTTP_NOT_AUTHORIZED: 403,
    HTTP_BAD_REQUEST: 400,

    // Custom Error Codes
    NOT_AUTH_ERRCODE: -1,
    ROUTE_NOT_FOUND_ERRCODE: -2,
    INVALID_ID_ERRCODE: -3,
    PROD_NOT_FOUND_ERRCODE: -4,
    CHRT_NOT_FOUND_ERRCODE: -5,

    // DAO
    DAO_OPTIONS: DAO_OPTIONS,
    PRODUCTO_DAO:  process.env.PRODUCTOS_DAO || DAO_OPTIONS.MONGO,
    CARRITO_DAO:  process.env.CARRITOS_DAO || DAO_OPTIONS.MONGO,
})