import cfg from '../config.js'


// Validacion de Opciones
if(!Object.values(cfg.DAO_OPTIONS).includes(cfg.PRODUCTO_DAO)){
  throw new Error(`No se reconoce el DAO [${cfg.PRODUCTO_DAO}] seleccionado`)
}

if(!Object.values(cfg.DAO_OPTIONS).includes(cfg.CARRITO_DAO)){
  throw new Error(`No se reconoce el DAO [${cfg.CARRITO_DAO}] seleccionado`)
}

/**  ToDo: Soportar la carga de carritos en tablas SQL
 * Actualmente no es posible guardar carritos en tablas SQL debido al campo "productos".
 *  */
if ([cfg.DAO_OPTIONS.SQLITE, cfg.DAO_OPTIONS.DB].includes(cfg.CARRITO_DAO)) {
  throw new Error('No es posible seleccinar bases SQL para la entidad "Carritos"')
}

// Conexion con Mongo DB
if ([cfg.PRODUCTO_DAO, cfg.CARRITO_DAO].includes(cfg.DAO_OPTIONS.MONGO)) {
  const mongoose = (await import('mongoose')).default
  await mongoose.connect(cfg.mongoDbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const mongoDb = mongoose.connection;

  mongoDb.on('error', error => console.error(`Error al conectarse a la base de datos: ${error}`))
  mongoDb.once('open', () => {
    console.log('Conectado a la base de datos');
  });
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
