import pkg from 'pg'

const { Pool } = pkg 

const pool = new Pool ({
    user: 'postgres',
    host: 'db',
    database: 'db',
    password: 'postgres',
    port: 5432,
})

// ↓ cria uma promisse
pool.query()
    .then(() => console.log("Banco conectado")) 
    .catch(err => console.error(err)) 

export default pool