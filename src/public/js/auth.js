
class LoginRequeried extends Error {
    constructor(){
        super('Login requerido')
    }
}

function validateResponse(response){
    if (response.status == 403 || response.status == 401){
        throw new LoginRequeried()
    }
    const data = response.json()
    if (data.error && data.error < 0) {
        alert(`Error al actualizar: ${data.error.message}`)
        return false
    }
    return data
}
