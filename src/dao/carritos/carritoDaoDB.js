const Contenedor = require('../../contenedores/contenedorDB.js')
const conn = require('../../lib/connections.js')

class CarritoDaoDB extends Contenedor{
    constructor(){
        super(conn.sqlite,'carritos')
    }
}

module.exports = CarritoDaoDB
