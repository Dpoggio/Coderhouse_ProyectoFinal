import cfg from '../src/config.js'
import Knex from 'knex'

async function main(){
    const db = Knex(cfg.sqlite)

    //Creacion tabla Productos
    await db.schema.createTable('productos', table => {
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
            db.destroy()
        })


}

main()