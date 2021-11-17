import Contenedor from '../../contenedores/contenedorArchivos.js'

/**** Constantes ****/
const ARCHIVO = './DB/productos.txt'

class ProductoDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default ProductoDaoArchivos