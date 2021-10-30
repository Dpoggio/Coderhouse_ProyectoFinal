
cargarProductos()
cargarEditor()


  
async function cargarProductos() {
    const [ plantilla, productos ] = await Promise.all([ 
        fetch('/partials/editorProductos.hbs').then(respuesta => respuesta.text()),
        fetch('/api/productos').then(response => response.json())
    ])

    const render = Handlebars.compile(plantilla)
    const html = render({ productos })
    document.getElementById('listaProductos').innerHTML = html
}


async function cargarEditor(idProducto = null) {
    const plantilla = await fetch('/partials/formProducto.hbs')
            .then(respuesta => respuesta.text())

    let producto
    if (idProducto) {
        producto = await fetch(`/api/productos/${idProducto}`)
            .then(response => response.json())
    }
    

    const render = Handlebars.compile(plantilla)
    const html = render({ producto })
    document.getElementById('editor').innerHTML = html
}


function getHeader() {
    const user = document.getElementById('admin').checked ? "admin" : "dummy"
    return new Headers({
        'Authorization': 'Basic '+btoa(user + ':'), 
        'Content-Type': 'application/json'
    })
}

function validateResponse(data){
    if (data.error && data.error < 0){
        throw new Error(data.description)
    }
    return 
}

async function guardarProducto(form){
    
    const idProducto = form["id"].value
    const producto = {
        name: form["_name"].value,
        description: form["description"].value,
        code: form["code"].value,
        thumbnail: form["thumbnail"].value,
        price: form["price"].value,
        stock: form["stock"].value
    }

    let url, dataRequest

    // Creacion nuevo producto
    if (idProducto == null || idProducto == "") {
        dataRequest = {
            method: 'POST',
            headers: getHeader(), 
            body: JSON.stringify(producto)
        };
        url = `/api/productos/`
    // Modificacion Producto
    } else {
        dataRequest = {
            method: 'PUT',
            headers: getHeader(), 
            body: JSON.stringify(producto)
        }
        url = `/api/productos/${idProducto}`
    };

    await fetch(url, dataRequest)
        .then(response => response.json())
        .then(validateResponse)
        .then(() => cargarProductos())
        .then(() => alert('Actualizado Correctamente!'))
        .catch((err) => alert(`Error al actualizar: ${err.message}`))
    
    
    return false
}

async function eliminarProducto(idProducto){
    const dataRequest = {
        method: 'DELETE',
        headers: getHeader()
    };
    await fetch(`/api/productos/${idProducto}`, dataRequest)
        .then(response => response.json())
        .then(validateResponse)
        .then(() => cargarProductos())
        .then(() => alert('Eliminado Correctamente!'))
        .catch((err) => alert(`Error al actualizar: ${err.message}`))
    
    return false           
}

