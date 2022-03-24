import { Router } from 'express'
import passport from 'passport'
import { generateToken, refreshToken, generateTokenAndRender } from '../lib/auth.js';

const routerAuth = Router();
  
/**
 * @openapi
 * tags:
 *  - name: Authentication
 *    description: "Urls de Autenticacion"
 */

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



/**
 * @openapi
 * components:
 *  schemas:
 *      LoginRequest:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  required: true
 *              password:
 *                  type: string
 *                  required: true
 *      SignupRequest:
 *          $ref: '#/components/schemas/UsuarioRequest'
 *      RefreshTokenRequest:
 *          type: object
 *          properties:
 *              userId:
 *                  type: number
 *                  required: true
 *              refresh_token:
 *                  type: string
 *                  required: true
 *      AuthResponse:
 *          type: object
 *          properties:
 *              usuario:
 *                  $ref: '#/components/schemas/UsuarioResponse'
 *              access_token:
 *                  type: string
 *              refresh_token:
 *                  type: string
 */

/**** Rutas ****/

/**
 * @openapi
 * /auth/login:
 *  post:
 *      tags:
 *      - Authentication
 *      summary: Iniciar sesion
 *      description: Obtener tokens de inicio de sesion
 *      requestBody:
 *          description: Parametros requeridos
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginRequest'
 *      responses:
 *          200:
 *              description: Respuesta OK
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AuthResponse'
 *          404:
 *              description: Usuario no encontrado
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 *          403:
 *              description: Credenciales invalidas
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CustomError'
 */
 routerAuth.post('/login', passport.authenticate('login'), generateToken)

 /**
  * @openapi
  * /auth/signup:
  *  post:
  *      tags:
  *      - Authentication
  *      summary: Registrar usuario
  *      description: Registrar un nuevo usuario
  *      requestBody:
  *          description: Parametros requeridos
  *          content: 
  *              application/json:
  *                  schema:
  *                      $ref: '#/components/schemas/SignupRequest'
  *      responses:
  *          200:
  *              description: Respuesta OK
  *              content: 
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/AuthResponse'
  *          409:
  *              description: Usuario existente
  *              content: 
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/CustomError'
  */
 routerAuth.post('/signup', passport.authenticate('signup'), generateToken)
 
 
 /**
  * @openapi
  * /auth/refreshtoken:
  *  post:
  *      tags:
  *      - Authentication
  *      summary: Refrescar el token de acceso
  *      description: Solicita un nuevo token de acceso utilizando el token de refresco
  *      requestBody:
  *          description: Parametros requeridos
  *          content: 
  *              application/json:
  *                  schema:
  *                      $ref: '#/components/schemas/RefreshTokenRequest'
  *      responses:
  *          200:
  *              description: Respuesta OK
  *              content: 
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/AuthResponse'
  *          409:
  *              description: Usuario existente
  *              content: 
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/CustomError'
  */
 routerAuth.post('/refreshtoken', passport.authenticate('refreshtoken'), refreshToken)

// Google Auth
 routerAuth.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ]}));
 routerAuth.get('/google/callback', passport.authenticate('google'), generateTokenAndRender);
 
 export { routerAuth }
 