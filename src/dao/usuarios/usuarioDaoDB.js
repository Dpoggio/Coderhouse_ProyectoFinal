import Contenedor from '../../contenedores/contenedorDB.js'
import cfg from '../../config.js'

class UsuarioDaoDB extends Contenedor{
    constructor(){
        super(cfg.mariaDb,'usuarios')
    }
}

export default UsuarioDaoDB