export default class UsuarioDto {
    constructor(datos) {
        this.id = datos.id
        this.username = datos.username || ''
        this.nombre = datos.nombre || ''
        this.apellido = datos.apellido || ''
        this.direccion = datos.direccion || ''
        const dateParsed = Date.parse(datos.fechanacimiento)
        this.timestamp = dateParsed ? (new Date(dateParsed)).toISOString() : ''
        this.telefono = datos.telefono || 0
        this.imagenurl = datos.imagenurl || ''
        this.admin = !!datos.admin 
    }

    static asDto(datos) {
        if (Array.isArray(datos))
            return datos.map(p => new UsuarioDto(p))
        else
            return new UsuarioDto(datos)
    }
}

