import pool from '../app/database.js'

pool.query(`
    CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, 
    email VARCHAR(100), 
    senha VARCHAR(100));`)