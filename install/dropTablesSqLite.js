import cfg from '../src/config.js'
import Knex from 'knex'

async function main(){
    
    const db = Knex(cfg.sqlite)
    
        
    // Drop tabla productos
    await db.schema.dropTableIfExists('productos')
        .catch(err => {
            console.log('Error al dropear tabla de Productos')
            console.log(err)
        })



    db.destroy()
}

main()