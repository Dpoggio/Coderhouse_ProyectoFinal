import dotenv from 'dotenv' 
dotenv.config()

const DAO_OPTIONS = {
    FILE: 'Archivos',
    DB: 'DB',
    SQLITE: 'SqLite',
    MONGO: 'Mongo',
    FIREBASE: 'Firebase'
}

export default Object.freeze({
    // Misc
    PORT: process.env.PORT || 8080,
    PRIVATE_KEY: process.env.USER_PRIVATE_KEY,
    ENABLE_VALIDATION: process.env.ENABLE_VALIDATION == 'true', // Variable para Testeo

    // HTTP
    HTTP_NOT_FOUND: 404,
    HTTP_CREATED: 201,
    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    HTTP_FORBIDDEN: 403,
    HTTP_CONFLICT: 409,
    HTTP_SERVER_ERROR: 500,

    // DAO
    DAO_OPTIONS: DAO_OPTIONS,
    DAO_ENTITIES: {
        PRODUCTO:  process.env.PRODUCTOS_DAO || DAO_OPTIONS.FILE,
        CARRITO:  process.env.CARRITOS_DAO || DAO_OPTIONS.FILE,
        USUARIO:  process.env.USUARIOS_DAO || DAO_OPTIONS.FILE
    },

    // CONECTIONS
    mariaDb: {
        client: 'mysql',
        connection: { 
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'test'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: { filename: process.env.SQLITE_FILENAME || './DB/ecommerce.db'}
    },
    mongoDbURL: process.env.MONGO_URL || "mongodb://localhost:27017/ecommerce",
    firebaseFile: process.env.FIREBASE_FILE || "./DB/firebase.json"
})