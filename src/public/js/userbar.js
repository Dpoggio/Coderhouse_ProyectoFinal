cargarBarra()

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_nombre');
    localStorage.removeItem('user_avatar');
    location.href = '/index.html'
}


async function cargarBarra() {
    plantilla = await fetch('/partials/userbar.hbs').then(respuesta => respuesta.text())
    const render = Handlebars.compile(plantilla)
    const nombre = localStorage.getItem('user_nombre')
    const avatar = localStorage.getItem('user_avatar')
    const html = render({ nombre, avatar })
    document.getElementById('userbar').innerHTML = html
}