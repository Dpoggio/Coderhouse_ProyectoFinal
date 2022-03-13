import Contenedor from '../../contenedores/contenedorFirebase.js'
import cfg from '../../config.js'

class ProductoDaoFirebase extends Contenedor{
    constructor(){
        const firebaseFile = cfg.firebaseFile
        super('productos', firebaseFile)
    }
}

export default ProductoDaoFirebase