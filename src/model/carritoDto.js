import ProductoDto from './productoDto.js'
export default class CarritoDto {
    constructor(datos) {
        this.id = datos.id
        this.timestamp = (new Date((datos.timestamp))).toISOString()
        this.productos = datos.productos.map( p => { return {
                cantidad: p.cantidad || 0,
                producto: ProductoDto.asDto(p.producto)
            }
        })
    }

    static asDto(datos) {
        if (Array.isArray(datos))
            return datos.map(p => new CarritoDto(p))
        else
            return new CarritoDto(datos)
    }
}