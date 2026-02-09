import pkg from 'pg'
import { env } from '../config/config.js'

const { Pool } = pkg 

const pool = new Pool ({
    user: env.postgresUser,
    host: env.postgresHost,
    database: env.postgresDB,
    password: env.postgresPassword,
    port: env.port,
})

// ↓ cria uma promisse
pool.query("SELECT NOW()")
    .then(() => console.log("Banco conectado")) 
    .catch(err => console.error(err)) 

export default pool