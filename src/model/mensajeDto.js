export default class MensajeDto {
    constructor(datos) {
        this.id = datos.id
        this.mail = datos.mail || ''
        this.type = datos.type || ''
        this.text = datos.text || ''
        const timestampParsed = Date.parse(datos.timestamp)
        this.timestamp = timestampParsed ? (new Date(timestampParsed)).toISOString() : ''
    }

    static asDto(datos) {
        if (Array.isArray(datos))
            return datos.map(p => new MensajeDto(p))
        else
            return new MensajeDto(datos)
    }
}

