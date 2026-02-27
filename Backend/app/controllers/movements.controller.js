import pool from '../database/database.js'
import { criaMovimentacaoSaidaService } from '../services/movements.services.js'
import { criaMovimentacaoEntradaService } from '../services/movements.services.js'

// --------------------------------------------------- CRIA ENTRADA ---------------------------------------------------

export async function criaMovimentacaoEntrada(req, res){
    try{
        const { produto_id, tipo, quantidade, data_hora, usuario_id} = req.body

        await criaMovimentacaoEntradaService(req.body)
        return res.status(200).json({mensagem: "Movimentação de entrada criada com sucesso!"})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}

// --------------------------------------------------- CRIA SAIDA ---------------------------------------------------

export async function criaMovimentacaoSaida(req, res){
    try{
        const { produto_id, tipo, quantidade, data_hora, usuario_id } = req.body

        await criaMovimentacaoSaidaService(req.body)
        return res.status(200).json({mensagem: "Movimentação de saida criada com sucesso!"})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}

// --------------------------------------------------- LISTA ---------------------------------------------------

export async function listaMovimentacoes(req, res){
    try {
        const movimentacoes = await pool.query("SELECT * FROM movements")
        return res.status(200).json({mensagem: "Movimentações retornadas com sucesso!", dados: movimentacoes.rows})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}