const Contenedor = require('../../contenedores/contenedorDB.js')
const conn = require('../../lib/connections.js')

class ProductoDaoDB extends Contenedor{
    constructor(){
        super(conn.sqlite,'productos')
    }
}

module.exports = ProductoDaoDB