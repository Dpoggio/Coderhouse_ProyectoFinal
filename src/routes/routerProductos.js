import { Router } from 'express'
import ProductosContr from '../controllers/productos.js'
import parser from '../lib/idParser.js'
import cfg from '../lib/constants.js'
import { auth } from '../lib/auth.js'

const routerProductos = Router();
const productoController = new ProductosContr()

/**** Rutas ****/
routerProductos.get('/', async (req, res, next) => {  
    try {
        const listaProductos = await productoController.get()
        res.json(listaProductos)    
    } catch (error) {
        next(error)
    }
})

routerProductos.get('/:id', async (req, res, next) => {  
    try {
        const id = parser.parseID(req.params.id)
        const producto = await productoController.get(id)
        res.json(producto)    
    } catch (error) {
        return next(error)
    }
})

routerProductos.post('/', auth, async (req, res, next) => {  
    try {
        const producto = await productoController.save(req.body)
        res.status(cfg.HTTP_CREATED).json(producto)
    } catch (error) {
        next(error)
    }
})

routerProductos.put('/:id', auth, async (req, res, next) => {  
    try {
        const id = parser.parseID(req.params.id)
        const producto = await productoController.save(req.body, id)
        res.json(producto)
    } catch (error) {
        next(error)
    }
})

routerProductos.delete('/:id', auth, async (req, res, next) => {  
    try {
        const id = parser.parseID(req.params.id)
        await productoController.delete(id)
        res.json({})
    } catch (error) {
        next(error)
    }
})


export { routerProductos }