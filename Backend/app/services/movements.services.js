import pool from '../database/database.js'

export async function criaMovimentacaoSaidaService(body){
    try {
        const { produto_id, tipo, quantidade, data_hora, usuario_id } = body

        if (produto_id === undefined || !tipo || quantidade === undefined || usuario_id === undefined){
            throw new Error("produto_id, tipo, quantidade e usuario_id são obrigatorios.")
        }

        const produto = await pool.query(`SELECT * FROM products WHERE id = ${produto_id}`)
        const quantidadeProduto = produto.rows[0]

        if (quantidade > quantidadeProduto.quantidade){
            throw new Error("Quantidade de retirada não pode ser maior que quantidade do estoque.")
        }

        await pool.query(`UPDATE products SET quantidade = quantidade - ${quantidade} WHERE id = ${produto_id}`)

        if (data_hora === undefined){
            await pool.query(`INSERT INTO movements(produto_id, tipo, quantidade, usuario_id) VALUES(${produto_id}, '${tipo}', ${quantidade}, ${usuario_id})`)
        } else {
            await pool.query(`INSERT INTO movements(produto_id, tipo, quantidade, data_hora, usuario_id) VALUES(${produto_id}, '${tipo}', ${quantidade}, '${data_hora}', ${usuario_id})`)
        }
    } catch (error) {
        console.log(err)
    }

}