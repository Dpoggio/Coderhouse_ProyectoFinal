import Contenedor from '../../contenedores/contenedorArchivos.js'
import cfg from '../../config.js'

/**** Constantes ****/
const ARCHIVO = cfg.fileLocation + '/usuarios.txt'

class UsuarioDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default UsuarioDaoArchivos