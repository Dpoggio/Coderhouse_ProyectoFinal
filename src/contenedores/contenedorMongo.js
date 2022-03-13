import mongoose from 'mongoose'
import logger from '../lib/logger.js'

class Contenedor {
    /**
     * Genera el contenedor a partir de un modelo de mongoose.
     * @param {Mongoose.Model} model : Modelo de coleccion de mongoose
     */
    constructor(model, mongoUri) {
        this.mongoUri = mongoUri
        this.collection = model
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
        await mongoose.connect(this.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => logger.info(`[${this.constructor.name}]: Conectado a la base de datos Mongo`))
        .catch(error => logger.error(`Error al conectarse a la base de datos: ${error}`))
    }

    /**
     * Procedimiento para finalizar el contenedor
     */
    async disconnect() {
        await mongoose.disconnect()
    }

    /**
     * Devuelve un array con los documentos presentes en la coleccion
     */
    async getAll(){
        try {
            return await this.collection.find({}, {_id: 0, __v: 0})
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un id y devuelve el documento con ese id, o null si no esta
     * @param {number} id : id del documento a obtener
     */
    async getById(id){
        try {
            return await this.collection.findOne({id: id}, {_id: 0, __v: 0})
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
            return await this.collection.find(filter, {_id: 0, __v: 0})
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Recibe un objeto, lo guarda en la coleccion, devuelve el id asignado
     * @param {object} objeto : objeto a guardar     
     */
    async save(objeto){
        
        try {
            const maxIdDoc = await this.collection.findOne({}, {id: 1}).sort({id: -1}).limit(1)
            objeto.id = (maxIdDoc ? maxIdDoc.id : 0) + 1
            await this.collection.create(objeto)
            return objeto
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Reemplaza el documento en el id asignado por el objeto recibido
     * @param {object} objeto : objeto a guardar
     * @param {number} id : id del registro a reemplazar
     */
     async saveById(objeto, id){
        try {
            const ret = await this.collection.findOneAndUpdate(
                {id: id}, 
                {$set: objeto}, 
                { 
                    new: true, 
                    projection: { _id: 0, __v: 0 }  
                }
            )
            return ret
        } catch(error){
            this.#handleError(error)
            return null
        }
    }

    /**
     * Elimina de la coleccion el documento con el id buscado
     * @param {number} id : id del documento a eliminar
     */
    async deleteById(id){
        try {
            const ret = await this.collection.findOneAndDelete({id: id}, { projection: { _id: 0, __v: 0 } })
            return ret
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Elimina todos los documentos en la coleccion
     */
    async deleteAll(){
        try{
            return await this.collection.deleteMany()
        } catch(error){
            this.#handleError(error)
        }
    }
}

export default Contenedor
