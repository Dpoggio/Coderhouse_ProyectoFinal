import { Router } from 'express'
import CarritoContr from '../controllers/carrito.js'
import parser from '../lib/idParser.js'
import cfg from '../config.js'

const routerCarrito = Router();
const carritoController = new CarritoContr()

/**** Rutas ****/
routerCarrito.post('/', async (req, res, next) => {  
    try {
        const id = await carritoController.save()
        res.status(cfg.HTTP_CREATED).json({ id })
    } catch (error) {
        next(error)
    }
})

routerCarrito.delete('/:id', async (req, res, next) => {  
    try {
        const id = parser.parseID(req.params.id)
        await carritoController.delete(id)
        res.json({})
    } catch (error) {
        next(error)
    }
})

routerCarrito.get('/:id/productos', async (req, res, next) => {  
    try {
        const id = parser.parseID(req.params.id)
        const productos = await carritoController.get(id)
        res.json(productos)    
    } catch (error) {
        return next(error)
    }
})

routerCarrito.post('/:id/productos/:id_prod', async (req, res, next) => {  
    try {
        const idCarrito = parser.parseID(req.params.id)
        const idProducto = parser.parseID(req.params.id_prod)
        await carritoController.add(idCarrito, idProducto)
        res.json({})
    } catch (error) {
        next(error)
    }
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res, next) => {  
    try {
        const idCarrito = parser.parseID(req.params.id)
        const idProducto = parser.parseID(req.params.id_prod)
        await carritoController.remove(idCarrito, idProducto)
        res.json({})
    } catch (error) {
        next(error)
    }
})


// Solo para testeo
routerCarrito.delete('/', async (req, res, next) => {  
    try {
        await carritoController.deleteAll()
        res.json({})
    } catch (error) {
        next(error)
    }
})


export { routerCarrito }