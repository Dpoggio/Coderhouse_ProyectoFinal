
export default Object.freeze({ 
    mariaDb: {
        client: 'mysql',
        connection: { 
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test'
        }
    },
    sqlite: {
        client: 'sqlite3',
        connection: { filename: './DB/ecommerce.db'}
    },
    mongoDbURL: "mongodb://localhost:27017/ecommerce",
    firebaseFile: "./DB/firebase.json"
})