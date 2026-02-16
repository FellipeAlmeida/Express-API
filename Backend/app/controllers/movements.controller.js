import pool from '../database.js'

// --------------------------------------------------- CRIA ENTRADA ---------------------------------------------------

export async function criaMovimentacaoEntrada(req, res){
    const { produto_id, tipo, quantidade, data_hora, usuario_id} = req.body

    if (!produto_id || !tipo || !quantidade || !usuario_id){
        return res.status(400).json({erro: "produto_id, tipo, quantidade e usuario_id são obrigatorios."})
    }

    if (!data_hora){
        await pool.query(`UPDATE products SET quantidade = quantidade + ${quantidade} WHERE id = ${produto_id}`)
        await pool.query(`INSERT INTO movements(produto_id, tipo, quantidade, usuario_id) VALUES(${produto_id}, '${tipo}', ${quantidade}, ${usuario_id})`)
        return res.status(200).json({mensagem: "Movimentação de entrada criada com sucesso!"})
    }

    await pool.query(`UPDATE products SET quantidade = quantidade + ${quantidade} WHERE id = ${produto_id}`)
    await pool.query(`INSERT INTO movements(produto_id, tipo, quantidade, data_hora, usuario_id) VALUES(${produto_id}, '${tipo}', ${quantidade}, '${data_hora}', ${usuario_id})`)
    return res.status(200).json({mensagem: "Movimentação de entrada criada com sucesso!"})
}

// --------------------------------------------------- CRIA SAIDA ---------------------------------------------------

export async function criaMovimentacaoSaida(req, res){
    const { produto_id, tipo, quantidade, data_hora, usuario_id} = req.body

    const produto = await pool.query(`SELECT * FROM products WHERE id = ${produto_id}`)
    const quantidadeProduto = produto.rows[0]

    if (quantidade > quantidadeProduto.quantidade){
        return res.status(500).json({erro: "Quantidade de retirada não pode ser maior que quantidade do estoque."})
    }

    if (!produto_id || !tipo || !quantidade || !usuario_id){
        return res.status(400).json({erro: "produto_id, tipo, quantidade e usuario_id são obrigatorios."})
    }

    if (!data_hora){
        await pool.query(`UPDATE products SET quantidade = quantidade - ${quantidade} WHERE id = ${produto_id}`)
        await pool.query(`INSERT INTO movements(produto_id, tipo, quantidade, usuario_id) VALUES(${produto_id}, '${tipo}', ${quantidade}, ${usuario_id})`)
        return res.status(200).json({mensagem: "Movimentação de saida criada com sucesso!"})
    }

    await pool.query(`UPDATE products SET quantidade = quantidade - ${quantidade} WHERE id = ${produto_id}`)
    await pool.query(`INSERT INTO movements(produto_id, tipo, quantidade, data_hora, usuario_id) VALUES(${produto_id}, '${tipo}', ${quantidade}, '${data_hora}', ${usuario_id})`)
    return res.status(200).json({mensagem: "Movimentação de saida criada com sucesso!"})
}

// --------------------------------------------------- LISTA ---------------------------------------------------

export async function listaMovimentacoes(req, res){
    const movimentacoes = await pool.query("SELECT * FROM movements")
    return res.status(200).json({mensagem: "Movimentações retornadas com sucesso!", dados: movimentacoes.rows})
}