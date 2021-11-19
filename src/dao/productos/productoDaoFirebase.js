import Contenedor from '../../contenedores/contenedorFirebase.js'

class ProductoDaoFirebase extends Contenedor{
    constructor(){
        super('productos')
    }
}

export default ProductoDaoFirebase