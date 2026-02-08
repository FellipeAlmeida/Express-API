import jwt from 'jsonwebtoken'
import { Router } from 'express'
import pool from '../database.js'

const routers = Router() 

// ---------------------------------- LOGIN ----------------------------------
routers.post('/login', async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha){
        res.status(400).json({erro: "Usuário e senha obrigatórios."})
    }

    const user = await pool.query(`SELECT * FROM users WHERE email = '${email}' AND senha = '${senha}'`)

    if (!user){
        res.status(401).json({erro: "Usuário ou senha inválidos."})
    }

    jwt.sign(
        {email, senha}
    )
})

// ---------------------------------- CRIAR USUÁRIO ----------------------------------
routers.post('/criar', (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha){
        res.status(400).json({erro: "Email e senha obrigatórios."})
    }

    pool.query(`INSERT INTO users(email, senha) VALUES ('${email}', '${senha}')`)
    return res.status(200).json({mensagem: "Usuário criado com sucesso!"})
})

export default routers