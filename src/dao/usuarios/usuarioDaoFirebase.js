import Contenedor from '../../contenedores/contenedorFirebase.js'
import cfg from '../../config.js'

class UsuarioDaoFirebase extends Contenedor{
    constructor(){
        const firebaseFile = cfg.firebaseFile
        super('usuarios', firebaseFile)
    }
}

export default UsuarioDaoFirebase