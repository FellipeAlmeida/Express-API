import pool from '../database/database.js'

export async function criaProdutoService(body){
    const {nome, quantidade, minimo} = body

    if (quantidade < 0){
        throw new Error("Não pode registrar produtos com quantidades negativas.")
    }

    if (!nome || quantidade === undefined){
        throw new Error("Nome e quantidade são obrigatórios.")
    }

    if (minimo === undefined){
        await pool.query(`INSERT INTO products(nome, quantidade) VALUES('${nome}', '${quantidade}')`)
    }

    await pool.query(`INSERT INTO products(nome, quantidade, minimo) VALUES('${nome}', '${quantidade}', '${minimo}')`)
}

export async function editaProdutoService(body, id){

    const {nome, minimo} = body

    if (!minimo){
            await pool.query(`UPDATE products SET nome = '${nome}' WHERE id = ${id}`)
        }

        if (!nome){
            await pool.query(`UPDATE products SET minimo = '${minimo}' WHERE id = ${id}`)
        }

        await pool.query(`UPDATE products SET nome = '${nome}', minimo = '${minimo}' WHERE id = ${id}`)
}