import cfg from '../src/config.js'
import Knex from 'knex'

async function main(){
    
    const db = Knex(cfg.mariaDb)
    
        
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
    
    // Drop tabla carrito_producto
    await db.schema.dropTableIfExists('carrito_producto')
        .catch(err => {
            console.log('Error al dropear tabla de carrito_producto')
            console.log(err)
        })


    db.destroy()
}

main()