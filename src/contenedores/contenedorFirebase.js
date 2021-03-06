// Conexion con Firebase
import firebase from 'firebase-admin'
import fs from 'fs'
import logger from '../lib/logger.js'

class Contenedor {
    /**
     * Genera el contenedor a partir de un modelo de mongoose.
     * @param {Mongoose.Model} model : Modelo de coleccion de mongoose
     */
    constructor(collectionName, firebaseFile) {
        this.collectionName = collectionName
        this.firebaseFile = firebaseFile
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
        const file = await fs.promises.readFile(this.firebaseFile)
        const serviceAccount = JSON.parse(file.toString())        
        const app = firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount)
        }, this.collectionName)
        const db = app.firestore();
        this.collection = db.collection(this.collectionName)
        logger.info(`[${this.constructor.name}]: Contenedor Firebase inicializado correctamente`)
    }

    /**
     * Procedimiento para finalizar el contenedor
     */
    async disconnect() {
    }

    /**
     * Devuelve un array con los documentos presentes en la coleccion
     */
    async getAll(){
        try {
            const snapshot = await this.collection.get()
            return snapshot.docs.map(item => item.data())
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
            const item = await this.collection.doc(`${id}`).get()
            return item.data()
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
            const snapshot = await this.collection.where(prop, '==', value).get()
            return snapshot.docs.map(item => item.data())
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
            const maxIdDoc = await this.collection.orderBy("id", "desc").limit(1).get()
            objeto.id = (maxIdDoc.docs.length > 0 ? parseInt(maxIdDoc.docs[0].id) : 0) + 1
            const doc = this.collection.doc(`${objeto.id}`)
            await doc.create(objeto)
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
            const item = await this.collection.doc(`${id}`).get()
                .then(async (docSnapshot) => {
                    if (docSnapshot.exists) {
                        await docSnapshot.ref.update(objeto)
                        return (await docSnapshot.ref.get()).data()
                    } else {
                        return null   
                    }
                });
            
            return item
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
            const item = await this.collection.doc(`${id}`).get()
                .then(async (docSnapshot) => {
                    if (docSnapshot.exists) {
                        await docSnapshot.ref.delete()
                        return 1
                    } else {
                        return null   
                    }
                });
            
            return item
        } catch(error){
            this.#handleError(error)
        }
    }

    /**
     * Elimina todos los documentos en la coleccion
     */
    async deleteAll(){
        try{
            await this.collection.get().then(docSnapshot => {
                docSnapshot.docs.forEach(snapshot => {
                    snapshot.ref.delete();
                })
            })

            return null
        } catch(error){
            this.#handleError(error)
        }
    }
}

export default Contenedor
