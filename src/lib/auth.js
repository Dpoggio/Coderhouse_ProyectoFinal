import cfg from '../config.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { ErrorRutaNoAutorizada, ErrorAutenticacionRequerida, ErrorTokenInvalido } from './errors.js'
import basicAuth from 'basic-auth'
import { loginStrategy, signupStrategy } from '../controllers/authContr.js'

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
            return next(new ErrorAutenticacionRequerida())
        }
        const token = authHeader.split(' ')[1]
        if (!token) {
            return next(new ErrorAutenticacionRequerida())
        }
        try {
            req.user = jwt.verify(token, PRIVATE_KEY);
        } catch (ex) {
            return next(new ErrorTokenInvalido())
        }
    }
    next();
}

// Passport Config
passport.use('login', loginStrategy)
passport.use('signup', signupStrategy)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export { isAuthenticated, isAuthorized, generateToken }