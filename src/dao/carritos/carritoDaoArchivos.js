const Contenedor = require('../../contenedores/contenedorArchivos.js')

/**** Constantes ****/
const ARCHIVO = './DB/carritos.txt'

class CarritoDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

module.exports = CarritoDaoArchivos