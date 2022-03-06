import Contenedor from '../../contenedores/contenedorDB.js'
import cfg from '../../config.js'

class UsuarioDaoDB extends Contenedor{
    constructor(){
        super(cfg.sqlite,'usuarios')
    }
}

export default UsuarioDaoDB