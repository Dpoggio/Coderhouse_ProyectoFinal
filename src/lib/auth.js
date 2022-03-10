import cfg from '../config.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import jwt from 'jsonwebtoken'
import UsuarioApi from '../services/usuarioApi.js'
import MailApi from '../services/mailApi.js'
import { ErrorRutaNoAutorizada, ErrorAutenticacionRequerida, ErrorTokenInvalido } from './errors.js'
import basicAuth from 'basic-auth'

const PRIVATE_KEY = cfg.PRIVATE_KEY

// Helpers
function isAdmin(req){
    return req.user && req.user.admin
}

function isSuperAdmin(req){
    const credentials = basicAuth(req)
    return (credentials && credentials.name == "admin")
}

// Export Functions
function generateToken(req, res) {
    const user = req.user
    const token = jwt.sign({ username: user.username, admin: user.admin }, PRIVATE_KEY, { expiresIn: 30 });

    res.json({
        usuario: user,
        access_token: token
    });
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
            next(new ErrorAutenticacionRequerida())
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            next(new ErrorAutenticacionRequerida())
        }
        try {
            req.user = jwt.verify(token, PRIVATE_KEY);
        } catch (ex) {
            next(new ErrorTokenInvalido())
        }
    }
    next();
}

// Passport Config
const usuarioApi = new UsuarioApi()

const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const newUser = await usuarioApi.validateUser(username, password)
        return done(null, newUser)
    } catch(error) {
        done(error)
    }
})

const signupStrategy = new LocalStrategy({ passReqToCallback: true },
  async (req, username, password, done) => {
    try {
        const newUser = await usuarioApi.save(req.body)
        MailApi.newUserMailNotif(newUser)
        return done(null, newUser)
    } catch(error) {
        done(error)
    }
  }
)

passport.use('login', loginStrategy)
passport.use('signup', signupStrategy)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export { isAuthenticated, isAuthorized, generateToken }