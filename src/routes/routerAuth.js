import { Router } from 'express'
import passport from 'passport'
import { generateToken, refreshToken } from '../lib/auth.js';

const routerAuth = Router();
  
routerAuth.post('/login', passport.authenticate('login'), generateToken)
routerAuth.post('/signup', passport.authenticate('signup'), generateToken)
routerAuth.post('/refreshtoken', passport.authenticate('refreshtoken'), refreshToken)

export { routerAuth }
