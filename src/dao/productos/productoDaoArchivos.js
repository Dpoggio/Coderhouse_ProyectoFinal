const Contenedor = require('../../contenedores/contenedorArchivos.js')

/**** Constantes ****/
const ARCHIVO = './DB/productos.txt'

class ProductoDaoArchivos extends Contenedor{
    constructor(){
        super(ARCHIVO)
    }
}

module.exports = ProductoDaoArchivos