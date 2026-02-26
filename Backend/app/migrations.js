import pool from './database/database.js'

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

        await pool.query(`INSERT INTO users (email, senha, perfil)
        VALUES (
            'admin@email.com',
            '$2b$10$EoGrO4pC8d2wu0yNW2EJgeDZMkPz3HUISiGn0yAvcbBU06b.y2TWq',
            'admin'
        )
        ON CONFLICT (email) DO NOTHING`)

        await pool.query(`INSERT INTO users (email, senha, perfil)
        VALUES (
            'estoquista@email.com',
            '$2b$10$EoGrO4pC8d2wu0yNW2EJgeDZMkPz3HUISiGn0yAvcbBU06b.y2TWq',
            'estoquista'
        )
        ON CONFLICT (email) DO NOTHING`)

        await pool.query(`INSERT INTO users (email, senha, perfil)
        VALUES (
            'consultor@email.com',
            '$2b$10$EoGrO4pC8d2wu0yNW2EJgeDZMkPz3HUISiGn0yAvcbBU06b.y2TWq',
            'consultor'
        )
        ON CONFLICT (email) DO NOTHING`)

        await pool.query(`INSERT INTO products (nome, quantidade, minimo) VALUES('Arroz', 100, 50)`)
        await pool.query(`INSERT INTO products (nome, quantidade, minimo) VALUES('Macarrão', 40, 10)`)
        await pool.query(`INSERT INTO products (nome, quantidade, minimo) VALUES('Feijão carioca', 200, 70)`)

        console.log("Tabelas criadas e banco populado!")

    } catch (error){
        console.log(`Erro: ${error}, tentando novamente...`)
        setTimeout(conectaEPopulaBanco, 3000)
    }
}

conectaEPopulaBanco()