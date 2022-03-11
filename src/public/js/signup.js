const formRegister = document.getElementById("formRegister");
formRegister.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    username: formRegister[0].value,
    nombre: formRegister[1].value,
    apellido: formRegister[2].value,
    direccion: formRegister[3].value,
    fechanacimiento: new Date(formRegister[4].value),
    telefono: formRegister[5].value,
    imagenurl: formRegister[6].value,
    password: formRegister[7].value
  }

  const respuesta = await fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const content = await respuesta.json();
  const { access_token, usuario } = content;
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user_id", usuario.id );
    localStorage.setItem("user_nombre", usuario.nombre);
    localStorage.setItem("user_avatar", usuario.imagenurl);
    location.href = '/index.html'
  } else {
    location.href = '/failsignup.html'
  }
})
