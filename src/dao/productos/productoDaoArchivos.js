import Contenedor from '../../contenedores/contenedorArchivos.js'
import cfg from '../../config.js'

/**** Constantes ****/
const ARCHIVO = cfg.fileLocation + '/productos.txt'

class ProductoDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default ProductoDaoArchivos