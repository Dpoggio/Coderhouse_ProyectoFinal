
cargarProductos()
cargarEditor()


  
async function cargarProductos() {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
        return location.href='/login.html'
    }
    const [ plantilla, productos ] = await Promise.all([ 
        fetch('/partials/editorProductos.hbs').then(respuesta => respuesta.text()),
        fetch('/api/productos').then(validateResponse)
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
    if (document.getElementById('admin').checked){
        const user = "admin"
        return new Headers({
            'Authorization': 'Basic '+btoa(user + ':'), 
            'Content-Type': 'application/json'
        })
    } else {
        return new Headers({
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
            'Content-Type': 'application/json'
        })
    }
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

    
    try {
        const response = await fetch(url, dataRequest).then(validateResponse)
        alert('Actualizado Correctamente!')
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

async function eliminarProducto(idProducto){
    const dataRequest = {
        method: 'DELETE',
        headers: getHeader()
    };
    try {
        const response = await fetch(`/api/productos/${idProducto}`, dataRequest).then(validateResponse)
        alert('Eliminado Correctamente!')
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

