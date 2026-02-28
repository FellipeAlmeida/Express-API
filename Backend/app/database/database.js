import pkg from 'pg'
import { env } from '../config/config.js'

const { Pool } = pkg 
let config 

if (process.env.DATABASE_URL) {
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
            }
        }
} else {
    config = {
        user: env.postgresUser,
        host: env.postgresHost,
        database: env.postgresDB,
        password: env.postgresPassword,
        port: env.port,
    }
}

let pool = new Pool(config)

export default pool