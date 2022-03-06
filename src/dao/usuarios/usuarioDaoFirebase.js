import Contenedor from '../../contenedores/contenedorFirebase.js'

class UsuarioDaoFirebase extends Contenedor{
    constructor(){
        super('usuarios')
    }
}

export default UsuarioDaoFirebase