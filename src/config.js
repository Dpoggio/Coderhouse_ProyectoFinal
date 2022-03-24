import dotenv from 'dotenv' 
dotenv.config({
    path: ((env) => {
        switch (env) {
            case 'DESA':
                return 'desa.env'
            case 'TEST':
                return 'test.env'
            case 'STG':
                return 'stg.env'
            case 'HOMO':
                return 'homo.env'
            default:
                return '.env'
        }
    })(process.env.NODE_ENV)
})

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
    CLUSTER: process.env.CLUSTER == 'true',

    // AUTH
    TOKEN_PRIVATE_KEY: process.env.TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    TOKEN_EXP_TIME: parseInt(process.env.TOKEN_EXP_TIME || 30), // 30 Segs
    REFRESH_TOKEN_EXP_TIME: parseInt(process.env.REFRESH_TOKEN_EXP_TIME || 600), // 10 min
    ENABLE_VALIDATION: process.env.ENABLE_VALIDATION == 'true', // Variable para Testeo
    ENABLE_SUPERADMIN: process.env.ENABLE_SUPERADMIN == 'true', // Variable para Testeo como administrador
    
    //MAIL
    MAIL_ENABLED: process.env.MAIL_ENABLED == 'true',
    MAIL_USER: process.env.MAIL_USER,
    MAIL_APPSENDER: process.env.MAIL_APPSENDER,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    
    // Twilio
    TWILIO_ENABLED: process.env.TWILIO_ENABLED == 'true',
    TWILIO_ACCOUNTSID: process.env.TWILIO_ACCOUNTSID,
    TWILIO_AUTHTOKEN: process.env.TWILIO_AUTHTOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,

    // Google Auth
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    
    // Admin Data
    ADMIN_MAIL: process.env.ADMIN_MAIL,
    ADMIN_NUMBER: process.env.ADMIN_NUMBER,

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
        USUARIO:  process.env.USUARIOS_DAO || DAO_OPTIONS.FILE,
        MENSAJE:  process.env.MENSAJES_DAO || DAO_OPTIONS.FILE,
        ORDEN:  process.env.ORDENES_DAO || DAO_OPTIONS.FILE,
    },

    // CONECTIONS
    fileLocation: process.env.FILE_DB_PATH || './DB',
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