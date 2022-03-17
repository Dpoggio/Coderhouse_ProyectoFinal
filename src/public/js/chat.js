Handlebars.registerHelper('formatDate', function(date) {
    return new Handlebars.SafeString(
        new Date(date).toLocaleString()
    );
});

async function cargarMensajes(mensajes) {
    const plantilla = await obtenerPlantillaMensajes()
    const render = Handlebars.compile(plantilla);
    const html = render({ mensajes })
    document.getElementById('mensajes').innerHTML = html
    const scrollHeight = document.getElementById("mensajes").scrollHeight
    document.getElementById("mensajes").scrollTop = scrollHeight
}

function obtenerPlantillaMensajes() {
    return fetch('/partials/listaMensajes.hbs')
        .then(respuesta => respuesta.text())
}


socket.on('actualizarMensajes', mensajesNorm => {
    cargarMensajes(mensajesNorm)
});

socket.on('invalidToken', () => {
    return location.href='/login.html'
});


function agregarMensaje(form) {
    const token = localStorage.getItem("access_token")
    mensaje = {
        type: "Usuario",
        text: form["mensaje"].value
    }
    socket.emit('nuevoMensaje', mensaje, token);
    form["mensaje"].value=""
    return false;
}