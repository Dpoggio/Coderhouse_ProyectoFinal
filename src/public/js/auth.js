
class LoginRequeried extends Error {
    constructor(){
        super('Login requerido')
    }
}

async function validateResponse(response){
    if (response.status == 403 || response.status == 401){
        throw new LoginRequeried()
    }
    const data = await response.json()
    if (response.status >= 500 || (data.error && data.description) ) {
        const mensaje = data.description || 'error en el servidor'
        alert(`Error: ${mensaje}`)
        throw new Error(mensaje)
    }
    return data
}
