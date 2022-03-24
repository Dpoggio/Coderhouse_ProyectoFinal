generarOrdenes()

async function generarOrdenes() {
    const idUsuario = localStorage.getItem("user_id")
    const [ plantilla, ordenes ] = await Promise.all([ 
        fetch('/partials/listaOrdenes.hbs').then(respuesta => respuesta.text()),
        callSecuredApi(`/api/ordenes/usuario/${idUsuario}`).then(response => response.json())
    ])

    const render = Handlebars.compile(plantilla)
    const html = render({ ordenes })
    document.getElementById('listaOrdenes').innerHTML = html
}
