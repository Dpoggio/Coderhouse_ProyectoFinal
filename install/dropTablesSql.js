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

    console.log("Inicia Dropeo")
    
    // Drop tabla carrito_producto
    await db.schema.dropTableIfExists('carrito_producto')
    .catch(err => {
        console.log('Error al dropear tabla de carrito_producto')
        console.log(err)
    })
    
    // Drop tabla productos
    await db.schema.dropTableIfExists('productos')
        .catch(err => {
            console.log('Error al dropear tabla de Productos')
            console.log(err)
        })

    // Drop tabla carritos
    await db.schema.dropTableIfExists('carritos')
        .catch(err => {
            console.log('Error al dropear tabla de carritos')
            console.log(err)
        })  

    // Drop tabla usuarios
    await db.schema.dropTableIfExists('usuarios')
        .catch(err => {
            console.log('Error al dropear tabla de Usuarios')
            console.log(err)
        })


    db.destroy()
}

main()