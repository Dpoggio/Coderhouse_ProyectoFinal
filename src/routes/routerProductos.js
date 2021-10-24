const { Router } = require('express');
const Productos = require('../controllers/productos.js')
const parser = require('../lib/idParser.js')
const cfg = require('../lib/constants.js')
const { auth } = require('../lib/login.js')

const routerProductos = Router();
const productoController = new Productos()

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


exports.routerProductos = routerProductos;