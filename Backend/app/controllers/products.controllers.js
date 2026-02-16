import pool from '../database.js'
import { env } from '../config.js'
import jwt from 'jsonwebtoken'

// --------------------------------------------------- CRIA ---------------------------------------------------

export async function criaProduto(req, res){
    try {
        const {nome, quantidade, minimo} = req.body 

        if (quantidade < 0){
            return res.status(401).json({erro: "Não pode registrar produtos com quantidades negativas."})
        }

        if (!nome || !quantidade){
            return res.status(401).json({erro: "Nome e quantidade são obrigatórios."})
        }

        if (!minimo){
            pool.query(`INSERT INTO products(nome, quantidade) VALUES('${nome}', '${quantidade}')`)
            return res.status(200).json({mensagem: "Produto criado com sucesso!"})
        }

        pool.query(`INSERT INTO products(nome, quantidade, minimo) VALUES('${nome}', '${quantidade}', '${minimo}')`)
        return res.status(200).json({mensagem: "Produto criado com sucesso!"})    
    } catch (error) {
        return res.status(500).json({erro: error})
    }
    
}

// --------------------------------------------------- LISTA ---------------------------------------------------

export async function listaProduto(req, res){
    try{ 
        const produtos = await pool.query("SELECT * FROM products")
        return res.status(200).json({mensagem: "Produtos retornados com sucesso!", dados: produtos.rows})
    } catch (error) {
        return res.status(500).json({erro: error})
    }

}

// --------------------------------------------------- BUSCA ---------------------------------------------------

export async function buscaProduto(req, res){
    try{
        const id = req.params.id

        const produtos = await pool.query(`SELECT * FROM products WHERE id = ${id}`)

        return res.status(200).json({message: "Produto retornado com sucesso!", dados: produtos.rows[0]})
    } catch (error){
        return res.status(500).json({erro: error})
    }
}

// --------------------------------------------------- EDITA ---------------------------------------------------

export async function editaProduto(req, res){
    try{
        const { nome, minimo } = req.body
        const id = req.params.id

        if (!minimo){
            await pool.query(`UPDATE products SET nome = '${nome}' WHERE id = ${id}`)
            return res.status(200).json({mensagem: "Produto atualizado com sucesso!"})
        }

        if (!nome){
            await pool.query(`UPDATE products SET minimo = '${minimo}' WHERE id = ${id}`)
            return res.status(200).json({mensagem: "Produto atualizado com sucesso!"})
        }

        await pool.query(`UPDATE products SET nome = '${nome}', minimo = '${minimo}' WHERE id = ${id}`)
        return res.status(200).json({mensagem: "Produto atualizado com sucesso!"})
    } catch (error){
        return res.status(500).json({erro: error})
    }
}

// --------------------------------------------------- DELETA ---------------------------------------------------

export async function deletaProduto(req, res){
    try{
    const id = req.params.id

    await pool.query(`DELETE from products WHERE id = ${id}`)
    return res.status(200).json({mensagem: "Produto deletado com sucesso!"})
    } catch (error){
        return res.status(500).json({erro: error})
    }
}

// --------------------------------------------------- RELATORIO DE ALERTA BAIXO ESTOQUE ---------------------------------------------------

export async function alertaBaixoEstoque(req, res){
    const produtos = await pool.query('SELECT * FROM products WHERE quantidade <= minimo')
    return res.status(200).json({mensagem: "Produtos retornados com sucesso!", dados: produtos.rows})
}