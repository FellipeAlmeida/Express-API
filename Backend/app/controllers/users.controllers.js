import pool from '../database.js'
import { env } from '../config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function login(req, res){
    try {
        const { email, senha } = req.body
        const agora = new Date()

        if (!email || !senha){
            return res.status(400).json({erro: "Usuário, senha e perfil obrigatórios."})
        }

        const users = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)

        if (users.rows.length === 0){
            return res.status(401).json({erro: "Usuário ou senha inválidos."})
        }

        const user = users.rows[0]

        // verifica se ta bloqueado
        if (user.tempo_bloqueado && user.tempo_bloqueado > agora){
            return res.status(403).json({erro: `Conta bloqueada até ${user.tempo_bloqueado}`})
        }

        const senhaValida = await bcrypt.compare(senha, user.senha)

        if (!senhaValida){

            const tentativasLogin = await pool.query(`UPDATE users SET tentativas_login = tentativas_login + 1 WHERE email = '${email}' RETURNING tentativas_login`)  
            const tentativas = tentativasLogin.rows[0].tentativas_login

            if (tentativas > 3){
                const vezesBloqueado = await pool.query(`UPDATE users SET vezes_bloqueado = vezes_bloqueado + 1 WHERE email = '${email}' RETURNING vezes_bloqueado`)  
                const bloqueado = vezesBloqueado.rows[0].vezes_bloqueado

                const bloqueioAte = new Date(Date.now() + (30000 * bloqueado))
                const bloqueioEmMilisegundos = 30000 * bloqueado
                const bloqueioEmMinutos = (bloqueioEmMilisegundos / 1000) / 60

                await pool.query(`UPDATE users SET tempo_bloqueado = $1 WHERE email = $2`, [bloqueioAte, email])

                return res.status(403).json({erro: `Conta bloqueada por ${bloqueioEmMinutos} segundos.`})
            }
            return res.status(401).json({erro: `Credenciais inválidas.` })
        }

        await pool.query(`UPDATE users SET tempo_bloqueado = NULL, tentativas_login = 0 WHERE email = '${email}'`)  

        const token = jwt.sign(
            {id: user.id, email: user.email, perfil: user.perfil},

            env.secretKey,

            {expiresIn: "1h"}
        )

        return res.status(200).json({mensagem: "Login realizado com sucesso!", token})   

    } catch (error){
        console.log(`Erro: ${error}`)
        return res.status(500).json({erro: error})
    }
}

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