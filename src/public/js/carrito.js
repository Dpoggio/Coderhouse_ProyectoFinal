generarCarrito()
cargarProductos()

async function cargarProductos() {
    const [ plantilla, productos ] = await Promise.all([ 
        fetch('/partials/listaProductos.hbs').then(respuesta => respuesta.text()),
        callSecuredApi('/api/productos').then(response => response.json())
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
        
        await callSecuredApi('/api/carrito/', dataRequest)
        .then(response => response.json())
        .then((carrito) => {
            setChartCookie(carrito)
            actualizarCarrito()
        })    
    }
}

async function actualizarCarrito() {
    const idCarrito = localStorage.getItem("chart_id");
    const [ plantilla, carrito ] = await Promise.all([ 
        fetch('/partials/carritoListado.hbs')
            .then(respuesta => respuesta.text()),
        callSecuredApi(`/api/carrito/${idCarrito}/productos`)
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
    await callSecuredApi(`/api/carrito/${idCarrito}/productos/${idProducto}`, dataRequest)
        .then(response => response.json())
        .then((carr) => actualizarCarrito())
        
}

async function quitarDelCarrito(idProducto){
    const idCarrito = localStorage.getItem("chart_id");
    const dataRequest = {
        method: 'DELETE'
    };
    await callSecuredApi(`/api/carrito/${idCarrito}/productos/${idProducto}`, dataRequest)
        .then(response => response.json())
        .then((carr) => actualizarCarrito())
        
}

async function limpiarCarrito(){
    const idCarrito = localStorage.getItem("chart_id");
    const dataRequest = {
        method: 'DELETE'
    };
    await callSecuredApi(`/api/carrito/${idCarrito}`, dataRequest).catch(err => {return})
    localStorage.removeItem("chart_id");
    await generarCarrito()
}


async function enviarOrden(){
    const idCarrito = localStorage.getItem("chart_id")
    const idUsuario = localStorage.getItem('user_id')
    const carrito = await callSecuredApi(`/api/carrito/${idCarrito}/productos`).then(response => response.json())

    const orden = {
        usuario: {
            id: idUsuario
        },
        items: carrito.productos
    }

    try {
        const response = await callSecuredApi('/api/ordenes', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(orden)
          }).then(validateResponse)
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
