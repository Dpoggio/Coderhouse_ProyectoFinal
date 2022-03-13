import Contenedor from '../../contenedores/contenedorFirebase.js'
import cfg from '../../config.js'


class CarritoDaoFirebase extends Contenedor{
    constructor(){
        const firebaseFile = cfg.firebaseFile
        super('carritos', firebaseFile)
    }
}

export default CarritoDaoFirebase