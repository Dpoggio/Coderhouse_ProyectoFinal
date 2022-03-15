import Contenedor from '../../contenedores/contenedorArchivos.js'
import cfg from '../../config.js'

/**** Constantes ****/
const ARCHIVO = cfg.fileLocation + '/ordenes.txt'

class OrdenDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default OrdenDaoArchivos