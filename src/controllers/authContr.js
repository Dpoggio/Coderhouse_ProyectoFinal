import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import UsuarioApi from '../services/usuarioApi.js'
import cfg from '../config.js'

export const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await UsuarioApi.validateUser(username, password)
        return done(null, user)
    } catch(error) {
        done(error)
    }
})

export const signupStrategy = new LocalStrategy({ passReqToCallback: true },
  async (req, username, password, done) => {
    try {
        const newUser = await UsuarioApi.save(req.body)
        return done(null, newUser)
    } catch(error) {
        done(error)
    }
  }
)

export const googleStrategy = new GoogleStrategy({
        clientID: cfg.GOOGLE_CLIENT_ID,
        clientSecret: cfg.GOOGLE_CLIENT_SECRET,
        callbackURL: cfg.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    }, async (request, accessToken, refreshToken, profile, done) => {
        try {
            const user = await UsuarioApi.saveGoogleUser(profile)            
            return done(null, user);
        } catch(error) {
            done(error)
        }
    })

/**
 * Strategy de Refresco: valida la existencia del usuario y lo pasa al siguiente
 * middleware
 */
export const refreshtokenStrategy = new LocalStrategy({ 
        usernameField: 'userId',
        passwordField: 'userId' 
    },
    async (username, password, done) => {
    try {
        const userId = username
        const user = await UsuarioApi.get(userId)
        return done(null, user)
    } catch(error) {
        done(error)
    }
})

