import Contenedor from '../../contenedores/contenedorDB.js'
import cfg from '../../config.js'

class ProductoDaoDB extends Contenedor{
    constructor(){
        super(cfg.mariaDb,'productos')
    }
}

export default ProductoDaoDB