import cfg from '../src/config.js'
import Knex from 'knex'

async function main(){
    let db = null
    if (process.argv[2] == "MariaDB"){
        db = Knex(cfg.mariaDb)
    } else if (process.argv[2] == "SqLite") {
        db = Knex(cfg.sqlite)
    } else {
        console.log("Base no reconocida")
        return
    }

    //Creacion tabla Productos
    await db.schema.createTable('productos', table => {
            // Columnas
            table.increments('id') // Primary Key
            table.string('name')
            table.string('description')
            table.integer('code',10).unsigned()
            table.string('thumbnail')
            table.float('price')
            table.integer('stock',10).unsigned()
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
            table.integer('id_carrito',10).unsigned()
            table.integer('id_producto',10).unsigned()
            table.foreign('id_carrito').references('carritos.id')
        })
        .then(() => console.log('Tabla de carrito_producto Creada correctamente!'))
        .catch(err => {
            console.log('Error al crear tabla de carrito_producto')
            console.log(err)
        })

    //Creacion tabla Usuarios
    await db.schema.createTable('usuarios', table => {
        // Columnas
        table.increments('id') // Primary Key
        table.string('username')
        table.string('password')
        table.string('nombre')
        table.string('apellido')
        table.string('direccion')
        table.date('fechanacimiento')
        table.integer('telefono',10).unsigned()
        table.string('imagenurl')
        table.boolean('admin').notNullable().defaultTo(0)
    })
    .then(() => console.log('Tabla de Usuarios Creada correctamente!'))
    .catch(err => {
        console.log('Error al crear tabla de Usuarios')
        console.log(err)
    })

    db.destroy()
   
}

main()