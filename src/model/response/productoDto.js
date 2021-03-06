export default class ProductoDto {
    constructor(datos) {
        this.id = datos.id
        this.name = datos.name || ''
        this.description = datos.description || ''
        this.code = datos.code || 0
        this.thumbnail = datos.thumbnail || ''
        this.price = datos.price || 0
        this.stock = datos.stock || 0
        const timestampParsed = Date.parse(datos.timestamp)
        this.timestamp = timestampParsed ? (new Date(timestampParsed)).toISOString() : ''
    }

    static asDto(datos) {
        if (Array.isArray(datos))
            return datos.map(p => new ProductoDto(p))
        else
            return new ProductoDto(datos)
    }
}

