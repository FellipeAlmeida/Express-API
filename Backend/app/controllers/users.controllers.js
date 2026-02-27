import pool from '../database/database.js'
import { env } from '../config/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginService } from '../services/users.services.js'

// --------------------------------------------------- LOGIN ---------------------------------------------------

export async function login(req, res){
    try {
        const { email, senha } = req.body

        const token = await loginService(req.body)
        return res.status(200).json({mensagem: "Login realizado com sucesso!", token})   

    } catch (error){
        console.log(`Erro: ${error}`)
        return res.status(400).json({erro: error.message})
    }
}

// --------------------------------------------------- CRIA ---------------------------------------------------

export async function criaUsuario(req, res){
    try {
        const { email, senha, perfil } = req.body

        if (!email || !senha || !perfil){
            return res.status(400).json({erro: "Email, senha e perfil obrigatórios."})
        }

        const senhaHash = await bcrypt.hash(senha, 10) // <- 10 é o nivel de segurança do hash

        await pool.query(`INSERT INTO users(email, senha, perfil) VALUES ('${email}', '${senhaHash}', '${perfil}')`)
        return res.status(201).json({mensagem: "Usuário criado com sucesso!"})
    } catch (error) {
        console.log(`Erro: ${error}`)
        return res.status(500).json({erro: error})
    }
}

// --------------------------------------------------- LISTA ---------------------------------------------------

export async function listaUsuario(req, res){
    try {
        const usuarios = await pool.query("SELECT * FROM users")
        return res.status(200).json({mensagem: `Usuários retornados com sucesso:`, dados: usuarios.rows})
    } catch (error){
        return res.status(500).json({erro: error})
    }
}

// --------------------------------------------------- EDITA ---------------------------------------------------

export async function editaUsuario(req, res){
    try{
        const { perfil } = req.body
        const id = req.params.id
                
        await pool.query(`UPDATE users SET perfil = '${perfil}' WHERE id = ${id}`)
        
        return res.status(200).json({mensagem: "Usuário atualizado com sucesso!"})

    } catch (error) {
        return res.status(500).json({erro: error})
    }
}

// --------------------------------------------------- USUARIO ATUAL ---------------------------------------------------

export async function retornaUsuarioAtual(req, res){
    try {
        const auth = req.headers.authorization
        const decoded = jwt.verify(auth, env.secretKey)

        return res.status(200).json({mensagem: "Usuário atual retonado com sucesso!", dados: decoded})
    } catch (error) {
        return res.status(500).json({erro: error})
    }
}