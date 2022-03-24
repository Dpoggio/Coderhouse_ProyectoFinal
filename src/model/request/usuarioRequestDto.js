export default class UsuarioRequestDto {
    constructor(datos) {
        this.username = datos.username
        this.password = datos.password
        this.nombre = datos.nombre
        this.apellido = datos.apellido
        this.direccion = datos.direccion
        this.fechanacimiento = datos.fechanacimiento
        this.telefono = datos.telefono
        this.imagenurl = datos.imagenurl
        this.admin = datos.admin
    }

    static fromGoogleProfile(profile){
        const user = {
            username: profile.email,
            password: profile.id,
            nombre: profile.given_name,
            apellido: profile.family_name,
            direccion: null,
            fechanacimiento: null,
            telefono: null,
            imagenurl: profile.picture
        }
        return UsuarioRequestDto.asDto(user)
    }

    static asDto(datos) {
        if (Array.isArray(datos))
            return datos.map(p => new UsuarioRequestDto(p))
        else
            return new UsuarioRequestDto(datos)
    }
}

