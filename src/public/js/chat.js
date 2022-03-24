let socket

function initializeSocket() {
    socket = io.connect('/ws/chat', {query: `token=${localStorage.getItem("access_token")}`} );
        
    socket.on('actualizarMensajes', mensajes => {
        cargarMensajes(mensajes)
    });

    socket.on('invalidToken', async () => {
        try {
            await refreshToken()
            initializeSocket()
        } catch(error){
            return location.href='/login.html'
        }
    });
}

initializeSocket()

async function cargarMensajes(mensajes) {
    const plantilla = await obtenerPlantillaMensajes()
    const render = Handlebars.compile(plantilla);
    const html = render({ mensajes })
    document.getElementById('mail').value = localStorage.getItem('user_mail')
    document.getElementById('nombre').value = localStorage.getItem('user_nombre')
    document.getElementById('mensajes').innerHTML = html
    const scrollHeight = document.getElementById("mensajes").scrollHeight
    document.getElementById("mensajes").scrollBottom = scrollHeight
}

function obtenerPlantillaMensajes() {
    return fetch('/partials/listaMensajes.hbs')
        .then(respuesta => respuesta.text())
}

async function obtenerMensajes(){
    const token = localStorage.getItem("access_token")
    socket.emit('obtenerMensajes', {}, token)
}

function agregarMensaje() {
    const token = localStorage.getItem("access_token")
    mensaje = {
        type: "Usuario",
        text: document.getElementById("mensaje").value //form["mensaje"].value
    }
    socket.emit('nuevoMensaje', mensaje, token);
    document.getElementById("mensaje").value=""
    return false;
}