import Contenedor from '../../contenedores/contenedorDB.js'
import cfg from '../../config.js'

class CarritoDaoDB extends Contenedor{
    constructor(){
        super(cfg.sqlite,'carritos')
    }
}

export default CarritoDaoDB
