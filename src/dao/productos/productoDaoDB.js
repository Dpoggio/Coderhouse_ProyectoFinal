import Contenedor from '../../contenedores/contenedorDB.js'
import conn from '../../lib/connections.js'

class ProductoDaoDB extends Contenedor{
    constructor(){
        super(conn.sqlite,'productos')
    }
}

export default ProductoDaoDB