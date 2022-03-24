export default class OrdenDto {
    constructor(datos) {
        this.order_number = datos.id
        this.mail = datos.mail || ''
        this.items = datos.items.map( p => { return {
                cantidad: p.cantidad || 0,
                producto: {
                    name: p.producto.name || '',
                    description: p.producto.description || '',
                    code: p.producto.code || 0,
                    thumbnail: p.producto.thumbnail || '',
                    price: p.producto.price || 0,
                }
            }
        })
        this.status = datos.status || ''
        const timestampParsed = Date.parse(datos.timestamp)
        this.timestamp = timestampParsed ? (new Date(timestampParsed)).toISOString() : ''
    }

    static asDto(datos) {
        if (Array.isArray(datos))
            return datos.map(p => new OrdenDto(p))
        else
            return new OrdenDto(datos)
    }
}

