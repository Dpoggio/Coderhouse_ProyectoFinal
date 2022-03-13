import Contenedor from '../../contenedores/contenedorArchivos.js'
import cfg from '../../config.js'

/**** Constantes ****/
const ARCHIVO = cfg.fileLocation + '/mensajes.txt'

class MensajeDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default MensajeDaoArchivos