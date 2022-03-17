Handlebars.registerHelper('formatDate', function(date) {
    return new Handlebars.SafeString(
        new Date(date).toLocaleString()
    );
});

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


socket.on('actualizarMensajes', mensajes => {
    cargarMensajes(mensajes)
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