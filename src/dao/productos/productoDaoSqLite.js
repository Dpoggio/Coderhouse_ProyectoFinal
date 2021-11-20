import Contenedor from '../../contenedores/contenedorDB.js'
import cfg from '../../config.js'

class ProductoDaoDB extends Contenedor{
    constructor(){
        super(cfg.sqlite,'productos')
    }
}

export default ProductoDaoDB