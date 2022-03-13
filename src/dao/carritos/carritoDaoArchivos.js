import Contenedor from '../../contenedores/contenedorArchivos.js'
import cfg from '../../config.js'

/**** Constantes ****/
const ARCHIVO = cfg.fileLocation + '/carritos.txt'

class CarritoDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default CarritoDaoArchivos