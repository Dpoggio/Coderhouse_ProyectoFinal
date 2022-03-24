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

Handlebars.registerHelper("reverse", (array) => {
  return array.reverse()
}
)

Handlebars.registerHelper('formatDate', function(date) {
  if (!date){
      return new Handlebars.SafeString("");  
  } else {
      return new Handlebars.SafeString(
          new Date(date).toLocaleString()
      )
  }
});
