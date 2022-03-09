import Contenedor from '../../contenedores/contenedorMongo.js'
import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    id: {type: Number},
    username: {type: String},
    password: {type: String},
    nombre: {type: String},
    apellido: {type: String},
    direccion: {type: String},
    fechanacimiento: {type: Date},
    telefono: {type: Number},
    imagenurl: {type: String},
    admin: {type: Boolean}
})

class UsuarioDaoMongo extends Contenedor{
    constructor(){
        const usuarios = mongoose.model('usuarios', usuarioSchema)
        super(usuarios)
    }
}

export default UsuarioDaoMongo