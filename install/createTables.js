const conn = require('../src/lib/connections.js')

async function main(){
    const sqlite = require('knex')(conn.sqlite)

    
    //Creacion tabla Productos
    await sqlite.schema.createTable('productos', table => {
            // Columnas
            table.increments('id') // Primary Key
            table.string('name')
            table.string('description')
            table.integer('code')
            table.string('thumbnail')
            table.float('price')
            table.integer('stock')
            table.timestamp('timestamp')
        })
        .then(() => console.log('Tabla de Productos Creada correctamente!'))
        .catch(err => {
            console.log('Error al crear tabla de Productos')
            console.log(err)
        })
        .finally(() => {
            sqlite.destroy()
        })


}

main()