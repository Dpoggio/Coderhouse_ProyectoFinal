import { Router } from 'express'
import passport from 'passport'
import { generateToken, refreshToken } from '../lib/auth.js';

const routerAuth = Router();
  
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     basicAuth:
 *       type: http
 *       scheme: basic
 * security:
 *   - basicAuth: []    
 */


routerAuth.post('/login', passport.authenticate('login'), generateToken)
routerAuth.post('/signup', passport.authenticate('signup'), generateToken)
routerAuth.post('/refreshtoken', passport.authenticate('refreshtoken'), refreshToken)

export { routerAuth }
