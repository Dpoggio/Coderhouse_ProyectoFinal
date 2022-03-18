import cfg from '../config.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { ErrorRutaNoAutorizada, ErrorAutenticacionRequerida, ErrorTokenInvalido, ErrorFormatoIncorrecto } from './errors.js'
import basicAuth from 'basic-auth'
import { loginStrategy, signupStrategy, refreshtokenStrategy } from '../controllers/authContr.js'

const TOKEN_PRIVATE_KEY = cfg.TOKEN_PRIVATE_KEY
const REFRESH_TOKEN_PRIVATE_KEY = cfg.REFRESH_TOKEN_PRIVATE_KEY

// Helpers
function isAdmin(req){
    return req.user && req.user.admin
}

function isSuperAdmin(req){
    const credentials = basicAuth(req)
    return (credentials && credentials.name == "admin")
}

function getAccessToken(user){
    return jwt.sign({ id: user.id, username: user.username, admin: user.admin }, TOKEN_PRIVATE_KEY, { expiresIn: cfg.TOKEN_EXP_TIME });
}

function getRefreshToken(user){
    return jwt.sign({ id: user.id, username: user.username, admin: user.admin }, REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: cfg.REFRESH_TOKEN_EXP_TIME });
}

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

// Export Functions
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

function isAuthorized(req, res, next) {
    if(!cfg.ENABLE_VALIDATION || isAdmin(req) || isSuperAdmin(req)) {
        next();
    } else {
        next(new ErrorRutaNoAutorizada(req.originalUrl, req.method))
    }
}

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
            req.user = getUser(token)
        } catch (ex) {
            return next(ex)
        }
    }
    next();
}   

function getUser(token){
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

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export { isAuthenticated, isAuthorized, generateToken, refreshToken, getUser }