import cfg from '../config.js'
import logger from '../lib/logger.js'


// Validacion de Opciones
for (const dao in cfg.DAO_ENTITIES){
  if(!Object.values(cfg.DAO_OPTIONS).includes(cfg.DAO_ENTITIES[dao])){
    throw new Error(`No se reconoce el DAO [${dao}] seleccionado`)
  }
}

// Conexion con Mongo DB
if (Object.values(cfg.DAO_ENTITIES).includes(cfg.DAO_OPTIONS.MONGO)) {
  const mongoose = (await import('mongoose')).default
  await mongoose.connect(cfg.mongoDbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => logger.info('Conectado a la base de datos Mongo'))
  .catch(error => logger.error(`Error al conectarse a la base de datos: ${error}`))

}

// Conexion con Firebase
if (Object.values(cfg.DAO_ENTITIES).includes(cfg.DAO_OPTIONS.FIREBASE)) {
  const firebase = (await import('firebase-admin')).default
  const fs = (await import('fs')).default
  const file = await fs.promises.readFile(cfg.firebaseFile)
  const serviceAccount = JSON.parse(file.toString())

  firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount)
  })
}


// Export
export const ProductoDao = (await import(`../dao/productos/productoDao${cfg.DAO_ENTITIES.PRODUCTO}.js`)).default
export const CarritoDao = (await import(`../dao/carritos/carritoDao${cfg.DAO_ENTITIES.CARRITO}.js`)).default
export const UsuarioDao = (await import(`../dao/usuarios/usuarioDao${cfg.DAO_ENTITIES.USUARIO}.js`)).default
