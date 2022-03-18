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

  const { access_token, refresh_token, usuario } = content;

  if (access_token) {
    setUserCookies(access_token, refresh_token, usuario)
    location.href = '/index.html'
  } else {
    location.href = '/faillogin.html'
  }
})
