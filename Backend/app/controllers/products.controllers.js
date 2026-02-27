import pool from '../database/database.js'
import { criaProdutoService } from '../services/products.services.js'
import { editaProdutoService } from '../services/products.services.js'

// --------------------------------------------------- CRIA ---------------------------------------------------

export async function criaProduto(req, res){
    try {
        const {nome, quantidade, minimo} = req.body 
        await criaProdutoService(req.body)
        return res.status(200).json({mensagem: "Produto criado com sucesso!"})    
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}

// --------------------------------------------------- LISTA ---------------------------------------------------

export async function listaProduto(req, res){
    try{ 
        const produtos = await pool.query("SELECT * FROM products")
        return res.status(200).json({mensagem: "Produtos retornados com sucesso!", dados: produtos.rows})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}

// --------------------------------------------------- BUSCA ---------------------------------------------------

export async function buscaProduto(req, res){
    try{
        const id = req.params.id

        const produtos = await pool.query(`SELECT * FROM products WHERE id = ${id}`)

        return res.status(200).json({message: "Produto retornado com sucesso!", dados: produtos.rows[0]})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}

// --------------------------------------------------- EDITA ---------------------------------------------------

export async function editaProduto(req, res){
    try{
        const { nome, minimo } = req.body
        const id = req.params.id

        await editaProdutoService(req.body, id)
        return res.status(200).json({mensagem: "Produto atualizado com sucesso!"})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}

// --------------------------------------------------- DELETA ---------------------------------------------------

export async function deletaProduto(req, res){
    try{
    const id = req.params.id

    await pool.query(`DELETE from products WHERE id = ${id}`)
    return res.status(200).json({mensagem: "Produto deletado com sucesso!"})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}

// --------------------------------------------------- RELATORIO DE ALERTA BAIXO ESTOQUE ---------------------------------------------------

export async function alertaBaixoEstoque(req, res){
    try {
        const produtos = await pool.query('SELECT * FROM products WHERE quantidade <= minimo')
        return res.status(200).json({mensagem: "Produtos retornados com sucesso!", dados: produtos.rows})
    } catch (error){
        return res.status(500).json({erro: error.message})
    }
}