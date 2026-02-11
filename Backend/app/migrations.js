import pool from './database.js'

async function conectaEPopulaBanco(){
    try {

        console.log("Conectado ao banco")

        console.log("Criando tabelas do banco de dados...")

        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, 
        email VARCHAR(100) UNIQUE NOT NULL, 
        senha VARCHAR(255) NOT NULL,
        perfil VARCHAR(10) NOT NULL,
        tentativas_login INTEGER NOT NULL DEFAULT 0,
        tempo_bloqueado TIMESTAMP,
        vezes_bloqueado INTEGER DEFAULT 0);`)

        await pool.query(`
        CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY, 
        nome VARCHAR(100) NOT NULL, 
        quantidade INTEGER NOT NULL,
        minimo INTEGER NOT NULL DEFAULT 0);`)

        await pool.query(`
        CREATE TABLE IF NOT EXISTS movements(id SERIAL PRIMARY KEY, 
        produto_id INTEGER NOT NULL REFERENCES products(id), 
        tipo VARCHAR(10) NOT NULL,
        quantidade INTEGER NOT NULL,
        data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        usuario_id INTEGER NOT NULL REFERENCES users(id));`)

        console.log("Tabelas criadas!")

    } catch (error){
        console.log(`Erro: ${error}, tentando novamente...`)
        setTimeout(conectaEPopulaBanco, 3000)
    }
}

conectaEPopulaBanco()