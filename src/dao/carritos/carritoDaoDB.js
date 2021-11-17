import Contenedor from '../../contenedores/contenedorDB.js'
import conn from '../../lib/connections.js'

class CarritoDaoDB extends Contenedor{
    constructor(){
        super(conn.sqlite,'carritos')
    }
}

export default CarritoDaoDB
