import pool from '../database/database.js'

export async function criaProdutoService(body){
    try{
        const {nome, quantidade, minimo} = body

        if (quantidade < 0){
            throw new Error("Não pode registrar produtos com quantidades negativas.")
        }

        if (!nome || !quantidade){
            throw new Error("Nome e quantidade são obrigatórios.")
        }

        if (!minimo){
            await pool.query(`INSERT INTO products(nome, quantidade) VALUES('${nome}', '${quantidade}')`)
        }

        await pool.query(`INSERT INTO products(nome, quantidade, minimo) VALUES('${nome}', '${quantidade}', '${minimo}')`)
    } catch (err) {
        console.log(err)
    }
}
