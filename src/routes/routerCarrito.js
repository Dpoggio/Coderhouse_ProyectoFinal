const { Router } = require('express');
const Carrito = require('../controllers/carrito.js')
const parser = require('../utils/idParser.js')

const routerCarrito = Router();
const carritoController = new Carrito()

/**** Rutas ****/
routerCarrito.post('/', async (req, res, next) => {  
    try {
        const id = await carritoController.save()
        res.status(201).json({ id })
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
 
///

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


exports.routerCarrito = routerCarrito;