import Contenedor from '../../contenedores/contenedorArchivos.js'

/**** Constantes ****/
const ARCHIVO = './DB/carritos.txt'

class CarritoDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default CarritoDaoArchivos