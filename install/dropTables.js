const conn = require('../src/lib/connections.js')

async function main(){
    
    const sqlite = require('knex')(conn.sqlite)
    
        
    // Drop tabla productos
    await sqlite.schema.dropTableIfExists('productos')
        .catch(err => {
            console.log('Error al dropear tabla de Productos')
            console.log(err)
        })



    sqlite.destroy()
}

main()