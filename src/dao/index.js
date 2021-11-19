import ProductoDaoArchivos from '../dao/productos/productoDaoArchivos.js'
import ProductoDaoDB from '../dao/productos/productoDaoDB.js'
import ProductoDaoMongo from '../dao/productos/productoDaoMongo.js'
import ProductoDaoFirebase from '../dao/productos/productoDaoFirebase.js'

import CarritoDaoArchivos from '../dao/carritos/carritoDaoArchivos.js'
import CarritoDaoDB from '../dao/carritos/carritoDaoDB.js'
import CarritoDaoMongo from '../dao/carritos/carritoDaoMongo.js'
import CarritoDaoFirebase from '../dao/carritos/carritoDaoFirebase.js'

import mongoose from 'mongoose'
import conn from '../lib/connections.js'

// Conexion con Mongo DB
await mongoose.connect(conn.mongoDbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const mongoDb = mongoose.connection;

mongoDb.on('error', error => console.error(`Error al conectarse a la base de datos: ${error}`))
mongoDb.once('open', () => {
  console.log('Conectado a la base de datos');
});


// Conexion con Firebase
import fs from 'fs'
import firebase from 'firebase-admin'

const file = await fs.promises.readFile(conn.firebaseFile)
const serviceAccount = JSON.parse(file.toString())

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
})


export const ProductoDao = ProductoDaoFirebase
export const CarritoDao = CarritoDaoFirebase
