
let idCarrito

generarCarrito()
cargarProductos()


async function cargarProductos() {
    const [ plantilla, productos ] = await Promise.all([ 
        fetch('/partials/listaProductos.hbs').then(respuesta => respuesta.text()),
        fetch('/api/productos').then(response => response.json())
    ])

    const render = Handlebars.compile(plantilla)
    const html = render({ productos })
    document.getElementById('listaProductos').innerHTML = html
}

async function generarCarrito() {
    const dataRequest = {
        method: 'POST'
    };
    
    await fetch('/api/carrito/', dataRequest)
        .then(response => response.json())
        .then((carr) => {
            idCarrito = carr.id
            actualizarCarrito(idCarrito)
        })
    
}

async function actualizarCarrito() {
    const [ plantilla, productos ] = await Promise.all([ 
        fetch('/partials/carritoListado.hbs')
            .then(respuesta => respuesta.text()),
        fetch(`/api/carrito/${idCarrito}/productos`)
            .then(response => response.json())
            .then( p => p.map(x => x.producto) )
    ])

    const render = Handlebars.compile(plantilla)
    const html = render({ productos })
    document.getElementById('carritoListado').innerHTML = html
}


async function agregarAlCarrito(idProducto){
    const dataRequest = {
        method: 'POST'
    };
    await fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, dataRequest)
        .then(response => response.json())
        .then((carr) => actualizarCarrito(idCarrito))
        
}

async function quitarDelCarrito(idProducto){
    const dataRequest = {
        method: 'DELETE'
    };
    await fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, dataRequest)
        .then(response => response.json())
        .then((carr) => actualizarCarrito(idCarrito))
        
}
