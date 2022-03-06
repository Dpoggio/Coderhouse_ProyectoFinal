import Contenedor from '../../contenedores/contenedorArchivos.js'

/**** Constantes ****/
const ARCHIVO = './DB/usuarios.txt'

class UsuarioDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

export default UsuarioDaoArchivos