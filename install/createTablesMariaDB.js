import cfg from '../src/config.js'
import Knex from 'knex'

async function main(){
    const db = Knex(cfg.mariaDb)

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

    //Creacion tabla carritos
    await db.schema.createTable('carritos', table => {
            // Columnas
            table.increments('id') // Primary Key
            table.timestamp('timestamp')
        })
        .then(() => console.log('Tabla de carritos Creada correctamente!'))
        .catch(err => {
            console.log('Error al crear tabla de carritos')
            console.log(err)
        })
        
    
    //Creacion tabla carrito_producto
    await db.schema.createTable('carrito_producto', table => {
            // Columnas
            table.increments('id') // Primary Key
            table.integer('id_carrito')
            table.integer('id_producto')
            table.foreign('id_carrito').references('carritos.id')
        })
        .then(() => console.log('Tabla de carrito_producto Creada correctamente!'))
        .catch(err => {
            console.log('Error al crear tabla de carrito_producto')
            console.log(err)
        })
        

    db.destroy()


}

main()