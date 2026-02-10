import pkg from 'pg'
import { env } from './config.js'

const { Pool } = pkg 

const pool = new Pool ({
    user: env.postgresUser,
    host: env.postgresHost,
    database: env.postgresDB,
    password: env.postgresPassword,
    port: env.port,
})

export default pool