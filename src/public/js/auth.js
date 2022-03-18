
class LoginRequeried extends Error {
    constructor(){
        super('Login requerido')
    }
}


async function refreshToken() {

    try {
        const datos = {
            userId: localStorage.getItem('user_id'),
            refresh_token: localStorage.getItem('refresh_token')
        }

        const response = await fetch('/auth/refreshtoken', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
          });
          if (response.status == 403 || response.status == 401 || response.status >= 500){
            throw new LoginRequeried()
          }
        
          const content = await response.json();
        
          const { access_token, refresh_token, usuario } = content;
          if (access_token) {
            setUserCookies(access_token, refresh_token, usuario)
          } 
    } catch(error){
        throw new LoginRequeried()
    }
}

async function validateResponse(response){    
    const data = await response.json()
    if (response.status >= 500 || (data.error && data.description) ) {
        const mensaje = data.description || 'error en el servidor'
        alert(`Error: ${mensaje}`)
        throw new Error(mensaje)
    }
    return data
}


async function callSecuredApi(uri, options){
    try {
        const data = options
        if (!data){
            return await fetch(uri)
        }
        if (!data.headers){
            data.headers = new Headers()   
        }
        data.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
        const firstResponse = await fetch(uri, data)
        if (firstResponse.status == 403 || firstResponse.status == 401){
            await refreshToken()
            data.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
            const secondResponse = await fetch(uri, data)
            if (secondResponse.status == 403 || secondResponse.status == 401){
                throw new LoginRequeried()      
            }
            return secondResponse
        } else {
            return firstResponse
        }
    } catch (error){
        if(error instanceof LoginRequeried){
            return location.href='/login.html'
        } else {
            throw error
        }
    }
}