import pool from '../database.js'

export async function criaProduto(req, res){
    const {nome, quantidade, minimo} = req.body 

    if (!nome || !quantidade){
        return res.status(400).json({erro: "Nome e quantidade são obrigatórios."})
    }

    if (!minimo){
        pool.query(`INSERT INTO products(nome, quantidade) VALUES('${nome}', '${quantidade}')`)
        return res.status(200).json({mensagem: "Produto criado com sucesso!"})
    }

    pool.query(`INSERT INTO products(nome, quantidade, minimo) VALUES('${nome}', '${quantidade}', '${minimo}')`)
    return res.status(200).json({mensagem: "Produto criado com sucesso!"})
}