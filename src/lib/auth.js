import cfg from '../config.js'
import basicAuth from 'basic-auth'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import logger from '../lib/logger.js'
import jwt from 'jsonwebtoken'
import UsuarioApi from '../services/usuarioApi.js'

const IS_ADMIN = cfg.ADMIN

const PRIVATE_KEY = "myprivatekey";

function isAdmin(req, res, next) {
    const credentials = basicAuth(req)
    if(IS_ADMIN || (credentials && credentials.name == "admin")) {
        next();
    } else {
        next({
            code: cfg.NOT_AUTH_ERRCODE,
            httpStatusCode: cfg.HTTP_NOT_AUTHORIZED,
            message: `ruta '${req.originalUrl}' metodo '${req.method}' no authorizada`
        })
    }
}

function isAuthenticated(req, res, next) {
    logger.info(req.user)
    const credentials = basicAuth(req)
    if(IS_ADMIN || (credentials && credentials.name == "admin")) {
        next();
    } else {
            
        const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
    
        if (!authHeader) {
        return res.status(401).json({
            error: 'se requiere autenticacion para acceder a este recurso',
            detalle: 'no se encontró token de autenticación'
        })
        }
    
        const token = authHeader.split(' ')[1]
    
        if (!token) {
        return res.status(401).json({
            error: 'se requiere autenticacion para acceder a este recurso',
            detalle: 'formato de token invalido!'
        })
        }
    
        try {
        req.user = jwt.verify(token, PRIVATE_KEY);
        } catch (ex) {
        return res.status(403).json({
            error: 'token invalido',
            detalle: 'nivel de acceso insuficiente para el recurso solicitado'
        })
        }
    
        next();
    }
}


// function isAuthenticated(req, res, next){
//     if (req.isAuthenticated()){
//         next()
//     } else {
//         next({
//             code: cfg.NOT_AUTH_ERRCODE,
//             httpStatusCode: cfg.HTTP_NOT_AUTHORIZED,
//             message: `ruta '${req.originalUrl}' metodo '${req.method}' no authorizada`
//         })
//     }
//     // const credentials = basicAuth(req)
//     // if(IS_ADMIN || (credentials && credentials.name == "admin")) {
//     //     next();
//     // } else {
//     //     next({
//     //         code: cfg.NOT_AUTH_ERRCODE,
//     //         httpStatusCode: cfg.HTTP_NOT_AUTHORIZED,
//     //         message: `ruta '${req.originalUrl}' metodo '${req.method}' no authorizada`
//     //     })
//     // }
// }

const usuarioApi = new UsuarioApi()

const loginStrategy = new LocalStrategy(async (username, password, done) => {
    logger.info('Login Strategy')
    try {
        const newUser = await usuarioApi.validateUser(username, password)
        return done(null, newUser)
    } catch(error) {
        done(error)
    }
})

const signupStrategy = new LocalStrategy({ passReqToCallback: true },
  async (req, username, password, done) => {
    logger.info('Signup Strategy')
    try {
        const newUser = await usuarioApi.save(req.body)
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


function generateToken(req, res) {
    const user = req.user
    const token = jwt.sign({ username: user.username }, PRIVATE_KEY, { expiresIn: 5*60 });

    res.json({
        usuario: user,
        access_token: token
    });
}

export { isAuthenticated, generateToken, isAdmin }



// function createHash(password) {
//   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// }

// function isValidPassword(user, password) {
//   return bCrypt.compareSync(password, user.password);
// }

// const loginStrategy = new LocalStrategy(
//   (username, password, done) => {
//     usuarios.push({
//         username
//     })
//   }
// )

// const signupStrategy = new LocalStrategy({ passReqToCallback: true },
//   (req, username, password, done) => {
//     User.findOne({ 'username': username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }

//       if (user) {
//         return done(null, false)
//       }

//       const newUser = {
//         username: username,
//         password: createHash(password),
//       }

//       User.create(newUser, (err, userWithId) => {
//         if (err) {
//           return done(err);
//         }
//         return done(null, userWithId);
//       });
//     });
//   }
// )


// const loginStrategy = new LocalStrategy(
//     (username, password, done) => {
//       User.findOne({ username }, (err, user) => {
//         if (err)
//           return done(err);
  
//         if (!user) {
//           return done(null, false);
//         }
  
//         if (!isValidPassword(user, password)) {
//           return done(null, false);
//         }
  
//         return done(null, user);
//       });
//     }
//   )