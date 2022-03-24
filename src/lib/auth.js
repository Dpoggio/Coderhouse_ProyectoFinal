import cfg from '../config.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { ErrorRutaNoAutorizada, ErrorAutenticacionRequerida, ErrorTokenInvalido, ErrorFormatoIncorrecto } from './errors.js'
import basicAuth from 'basic-auth'
import { loginStrategy, signupStrategy, refreshtokenStrategy, googleStrategy } from '../controllers/authContr.js'

const TOKEN_PRIVATE_KEY = cfg.TOKEN_PRIVATE_KEY
const REFRESH_TOKEN_PRIVATE_KEY = cfg.REFRESH_TOKEN_PRIVATE_KEY


function isAdmin(req){
    return req.user && req.user.admin
}

/**
 * Funcion utilizada para testeo. Permite autenticacion de administrador a traves
 * de credenciales basicas utilizando como usuario "admin"
 */
function isSuperAdmin(req){
    const credentials = basicAuth(req)
    return (cfg.ENABLE_SUPERADMIN && credentials && credentials.name == "admin") 
}

/**
 * Tokens de Acceso: 
 *      permiten el acceso a los recursos. Una vez expirado, se requiere volver a realizar
 *      inicio de sesion o revalidacion del token para poder volver a acceder a los recursos.
 *      Se debe configurar con un tiempo corto.
 * Tokens de Refresco: 
 *      permite realizar un refesco del token de acceso, dandole la posibilidad al cliente 
 *      mantener una sesion volvendo a solicitar un nuevo token de acceso sin necesidad de
 *      un nuevo inicio de sesion. Una vez expirado, se requiere volver a realizar inicio 
 *      de sesion para obtener nuevos tokens de refresco y acceso para acceder a los recursos.
 *      Se puede configurar un valor relativamente alto para mantener la sesion activa durante 
 *      el mayor tiempo deseado
 */
function getAccessToken(user){
    return jwt.sign({ id: user.id, username: user.username, admin: user.admin }, TOKEN_PRIVATE_KEY, { expiresIn: cfg.TOKEN_EXP_TIME });
}

function getRefreshToken(user){
    return jwt.sign({ id: user.id, username: user.username, admin: user.admin }, REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: cfg.REFRESH_TOKEN_EXP_TIME });
}

/**
 * La siguiente funcion valida que el usuario
 */
function validateRefreshToken(user, refreshToken){
    try {       
        const userToken = jwt.verify(refreshToken, REFRESH_TOKEN_PRIVATE_KEY);
        if (user.id != userToken.id || user.username != userToken.username){
            throw new ErrorTokenInvalido()
        }
    } catch (error) {
        throw new ErrorTokenInvalido()
    }
}

/**
 * Middleware que genera tokens de acceso y refresco y se los responde al cliente.
 * Se utiliza cuando el usuario inicia sesion o se registra.
 */
function generateToken(req, res) {
    const user = req.user
    const token = getAccessToken(user)
    const refreshToken = getRefreshToken(user)

    res.json({
        usuario: user,
        access_token: token,
        refresh_token: refreshToken
    });
}

/**
 * Middleware que genera tokens de acceso y refresco y renderiza un script que guarda
 * los tokens como cookies; luego redirije al cliente al home.
 * 
 * Comentario: Intente pensar la forma de poder resolver esto sin tener que recurrir a
 * la vista y sin tener que usar sesiones, pero no se me ocurrio. Se que puedo usar un 
 * callback que retorne la informacion en formato json usando el middleware anterior, 
 * pero no encontre forma de darle los tokens desde el callback al cliente sin tener 
 * que renderizar una vista.
 */
function generateTokenAndRender(req, res) {
    const user = req.user
    const token = getAccessToken(user)
    const refreshToken = getRefreshToken(user)

    res.render('authenticated.ejs', {
        usuario: user,
        access_token: token,
        refresh_token: refreshToken
    });
}

/**
 * Middleware que genera un token de acceso nuevo, utilizando el token de refresco como validacion,
 * y se lo responde al cliente.
 * En el caso de que el token de refresco expire, el cliente debera volver a solicitar un inicio de sesion.
 */
function refreshToken(req, res, next){
    const user = req.user
    const refreshToken = req.body.refresh_token

    if(refreshToken) {
        try {            
            validateRefreshToken(user, refreshToken)
            const token = getAccessToken(user)
            res.json({
                usuario: user,
                access_token: token,
                refresh_token: refreshToken
            })             
        } catch (error) {
            next(new ErrorTokenInvalido())
        }
    } else {
        next(new ErrorFormatoIncorrecto('se requiere el parametro refresh_token'))
    }
}

/**
 * Valida autorizacion para acceder a un recurso. 
 * Niveles de autorizacion:
 *  - Admin
 *  - User
 * Configuracion:
 *  - ENABLE_VALIDATION=false : Deshabilita todas las validaciones y permite el acceso a todos los recursos
 *  - ENABLE_SUPERADMIN=true : Permite simular un administrador utilizando credenciales basicas de autenticacion para acceder a los recursos
 *  - isAdmin : Valida que el usuario tenga rol de administrador para acceder a los recursos
 */
function isAuthorized(req, res, next) {
    if(!cfg.ENABLE_VALIDATION || isAdmin(req) || isSuperAdmin(req)) {
        next();
    } else {
        next(new ErrorRutaNoAutorizada(req.originalUrl, req.method))
    }
}

/**
 * Valida autorizacion para acceder a un recurso. 
 * Niveles de autorizacion:
 *  - Admin
 *  - User
 * Configuracion:
 *  - ENABLE_VALIDATION=false : Deshabilita todas las validaciones y permite el acceso a todos los recursos sin 
 *                              sin necesidad de autenticacion (con excepcion del canal de chat)
 *  - ENABLE_SUPERADMIN=true : Permite simular un administrador utilizando credenciales basicas de autenticacion
 *                             para acceder a los recursos (no valido con el canal de chat)
 *  - Aclaracion!!: No es posible deshabilitar la autenticacion sobre el canal de chat.
 */
function isAuthenticated(req, res, next) {
    if ( cfg.ENABLE_VALIDATION && !isSuperAdmin(req)) {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

        if (!authHeader) {
            return next(new ErrorAutenticacionRequerida())
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return next(new ErrorAutenticacionRequerida())
        }
        try {
            req.user = verifyAndGetUser(token)
        } catch (ex) {
            return next(ex)
        }
    }
    next();
}   

function verifyAndGetUser(token){
    try {
        const user = jwt.verify(token, TOKEN_PRIVATE_KEY);
        return user
    } catch (error) {
        throw new ErrorTokenInvalido()
    }
}

// Passport Config
passport.use('login', loginStrategy)
passport.use('signup', signupStrategy)
passport.use('refreshtoken', refreshtokenStrategy)
passport.use(googleStrategy)

// ToDo: Pendiente serializacion de usuario.
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export { isAuthenticated, isAuthorized, generateToken, refreshToken, verifyAndGetUser, generateTokenAndRender }