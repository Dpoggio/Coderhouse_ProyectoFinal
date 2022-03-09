const formLogin = document.getElementById("formLogin");
formLogin.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    username: formLogin[0].value,
    password: formLogin[1].value,
  }

  const respuesta = await fetch('/auth/login', {
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
    localStorage.setItem("user_nombre", usuario.nombre );
    localStorage.setItem("user_avatar", usuario.imagenurl );
    location.href = '/index.html'
  } else {
    location.href = '/faillogin.html'
  }
})
