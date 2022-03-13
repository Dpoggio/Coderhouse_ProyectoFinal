import Knex from 'knex'
import logger from '../lib/logger.js'

class Contenedor {
    /**
     * Genera el contenedor a partir de un objeto de conexion a una DB y un nombre de tabla.
     * @param {string} options : Objeto de configuracion de knex
     * @param {string} tabla : Nombre de la tabla
     */
    constructor(options, tabla) {
        this.knex = Knex(options)
        this.tabla = tabla
    }

    // Private
    /**
     * Procedimiento interno para realizar el manejo de una excepcion.
     * @param {Error} error : Error ocurrido
     */
    #handleError(error){
        throw error
    }

    // Public

    /**
     * Procedimiento para inicializar el contenedor
     */
     async init() {
        logger.info(`[${this.constructor.name}]: Contenedor Sql inicializado correctamente`)
    }

    /**
     * Procedimiento para finalizar el contenedor
     */
    async disconnect() {
    }

    /**
     * Devuelve un array con los registros presentes en la tabla
     */
    async getAll(){
        try {
            return await this.knex(this.tabla)
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un id y devuelve el registro con ese id, o null si no esta
     * @param {number} id : id del registro a obtener
     */
    async getById(id){
        try {
            return await this.knex(this.tabla).where({id: id}).first()
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe una propiedad y un valor y retorna todos los documentos que cumplan la condicion
     * @param {string} prop : propiedad sobre la cual buscar
     * @param {string} value : valor de la propiedad
     */
     async getByProperty(prop, value){
        try {
            const filter = {}
            filter[prop] = value 
            return await this.knex(this.tabla).where(filter)
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe una clave y un valor devuelve todos los registros que coincidan
     * @param {number} id : id del registro a obtener
     */
     async getByField(name, value){
        try {
            return await this.knex(this.tabla).where(name, value)
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un objeto, lo guarda en la tabla, devuelve el id asignado
     * @param {object} objeto : objeto a guardar     
     */
    async save(objeto){
        
        try {
            const [ newID ] = await this.knex(this.tabla).insert(objeto)
            return await this.getById(newID)
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Reemplaza el registro en el id asignado por el objeto recibido
     * @param {object} objeto : objeto a guardar
     * @param {number} id : id del registro a reemplazar
     */
     async saveById(objeto, id){
        try {
            await this.knex(this.tabla).where({id: id})
                .update(objeto)
            return await this.getById(id)
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Elimina de la tabla el registro con el id buscado
     * @param {number} id : id del registro a eliminar
     */
    async deleteById(id){
        try {
            const regs = await this.knex(this.tabla).where({id: id}).del()
            return regs > 0 ? regs : null
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Elimina todos los registros en la tabla
     */
    async deleteAll(){
        try{
            return await this.knex(this.tabla).del()
        } catch(error){
            this.#handleError(error)
        }
    }
}

export default Contenedor
