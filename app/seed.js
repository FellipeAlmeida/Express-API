import pool from '../app/database.js'

async function populaBanco(){
    try {

        await pool.connect()
        console.log("Conectado ao banco")

        pool.query(`
        CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, 
        email VARCHAR(100), 
        senha VARCHAR(100));`)

    } catch (error){
        console.log(`Erro: ${error}, tentando novamente...`)
        setTimeout(populaBanco, 3000)
    }
}

populaBanco()