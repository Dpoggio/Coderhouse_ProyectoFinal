import { Strategy as LocalStrategy } from 'passport-local'
import UsuarioApi from '../services/usuarioApi.js'
import NotificationApi from '../services/notificationApi.js'

const usuarioApi = new UsuarioApi()

export const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const newUser = await usuarioApi.validateUser(username, password)
        return done(null, newUser)
    } catch(error) {
        done(error)
    }
})

export const signupStrategy = new LocalStrategy({ passReqToCallback: true },
  async (req, username, password, done) => {
    try {
        const newUser = await usuarioApi.save(req.body)
        NotificationApi.notificateNewUser(newUser)
        return done(null, newUser)
    } catch(error) {
        done(error)
    }
  }
)
