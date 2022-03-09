Handlebars.registerHelper("sumarProductos", (productos) => {
    if (!productos || productos.length == 0){
        return 0
    }
    return productos.map(p => p.producto.price*p.cantidad).reduce((a, b) => a + b)
  }
)

Handlebars.registerHelper("formatNumber", (number) => {
    return parseFloat(number).toFixed(2);
  }
)