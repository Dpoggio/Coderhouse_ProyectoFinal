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
    if (localStorage.getItem("chart_id")) {
        actualizarCarrito()
    } else {
        const dataRequest = {
            method: 'POST'
        };
        
        await fetch('/api/carrito/', dataRequest)
        .then(response => response.json())
        .then((carr) => {
            localStorage.setItem("chart_id", carr.id);
            actualizarCarrito()
        })    
    }
}

async function actualizarCarrito() {
    const idCarrito = localStorage.getItem("chart_id");
    const [ plantilla, carrito ] = await Promise.all([ 
        fetch('/partials/carritoListado.hbs')
            .then(respuesta => respuesta.text()),
        fetch(`/api/carrito/${idCarrito}/productos`)
            .then(response => response.json())
    ])

    const render = Handlebars.compile(plantilla)
    const html = render({ carrito })
    document.getElementById('carritoListado').innerHTML = html
}


async function agregarAlCarrito(idProducto){
    const idCarrito = localStorage.getItem("chart_id");
    const dataRequest = {
        method: 'POST'
    };
    await fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, dataRequest)
        .then(response => response.json())
        .then((carr) => actualizarCarrito(idCarrito))
        
}

async function quitarDelCarrito(idProducto){
    const idCarrito = localStorage.getItem("chart_id");
    const dataRequest = {
        method: 'DELETE'
    };
    await fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, dataRequest)
        .then(response => response.json())
        .then((carr) => actualizarCarrito(idCarrito))
        
}

async function limpiarCarrito(){
    const idCarrito = localStorage.getItem("chart_id");
    const dataRequest = {
        method: 'DELETE'
    };
    await fetch(`/api/carrito/${idCarrito}`, dataRequest).catch(err => {return})
    localStorage.removeItem("chart_id");
    await generarCarrito()
}


async function enviarOrden(){
    const idCarrito = localStorage.getItem("chart_id")
    const nombre = localStorage.getItem('user_nombre')
    const username = localStorage.getItem('username')

    const carrito = await fetch(`/api/carrito/${idCarrito}/productos`).then(response => response.json())

    const orden = {
        mail: username,
        nombre: nombre,
        items: carrito.productos
    }

    try {
        const response = await fetch('/api/ordenes', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(orden)
          })
        validateResponse(response)
        alert('Su orden ah sido enviarda correctamente!')
        cargarProductos()
        return false           
    } catch(err){
        if(err instanceof LoginRequeried){
            return location.href='/login.html'
        } else {
            throw err
        }
    }
}
