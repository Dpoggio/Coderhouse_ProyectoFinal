export default class UsuarioDto {
    constructor(datos) {
        this.id = datos.id
        this.username = datos.username || ''
        this.nombre = datos.nombre || ''
        this.apellido = datos.apellido || ''
    }

    static asDto(datos) {
        if (Array.isArray(datos))
            return datos.map(p => new UsuarioDto(p))
        else
            return new UsuarioDto(datos)
    }
}

