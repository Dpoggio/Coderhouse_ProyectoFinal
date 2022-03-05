import cfg from '../config.js'
import logger from '../lib/logger.js'


// Validacion de Opciones
if(!Object.values(cfg.DAO_OPTIONS).includes(cfg.PRODUCTO_DAO)){
  throw new Error(`No se reconoce el DAO [${cfg.PRODUCTO_DAO}] seleccionado`)
}

if(!Object.values(cfg.DAO_OPTIONS).includes(cfg.CARRITO_DAO)){
  throw new Error(`No se reconoce el DAO [${cfg.CARRITO_DAO}] seleccionado`)
}


// Conexion con Mongo DB
if ([cfg.PRODUCTO_DAO, cfg.CARRITO_DAO].includes(cfg.DAO_OPTIONS.MONGO)) {
  const mongoose = (await import('mongoose')).default
  await mongoose.connect(cfg.mongoDbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => logger.info('Conectado a la base de datos Mongo'))
  .catch(error => logger.error(`Error al conectarse a la base de datos: ${error}`))

}

// Conexion con Firebase
if ([cfg.PRODUCTO_DAO, cfg.CARRITO_DAO].includes(cfg.DAO_OPTIONS.FIREBASE)) {
  const firebase = (await import('firebase-admin')).default
  const fs = (await import('fs')).default
  const file = await fs.promises.readFile(cfg.firebaseFile)
  const serviceAccount = JSON.parse(file.toString())

  firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount)
  })
}


// Export
export const ProductoDao = (await import(`../dao/productos/productoDao${cfg.PRODUCTO_DAO}.js`)).default
export const CarritoDao = (await import(`../dao/carritos/carritoDao${cfg.CARRITO_DAO}.js`)).default
