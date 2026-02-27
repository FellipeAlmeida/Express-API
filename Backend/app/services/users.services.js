import pool from '../database/database.js'
import { env } from '../config/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function loginService(body){
        const { email, senha } = body
        const agora = new Date()

        // verificações 

        if (!email || !senha){
            throw new Error("Usuário e senha obrigatórios.")
        }

        const users = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)

        if (users.rows.length === 0){
            throw new Error("Usuário ou senha inválidos.")
        }

        const user = users.rows[0]

        // verifica se ta bloqueado
        if (user.tempo_bloqueado && user.tempo_bloqueado > agora){
            throw new Error(`Conta bloqueada até ${user.tempo_bloqueado}`)
        }

        // compara senha do usuario hasheada com a senha do banco
        const senhaValida = await bcrypt.compare(senha, user.senha)

        // lógica de bloqueio
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

                throw new Error(`Conta bloqueada por ${bloqueioEmMinutos} minutos.`)
            }
            throw new Error(`Credenciais inválidas.`)
        }

        await pool.query(`UPDATE users SET tempo_bloqueado = NULL, tentativas_login = 0 WHERE email = '${email}'`)  

        // gera token
        const token = jwt.sign(
            {id: user.id, email: user.email, perfil: user.perfil},

            env.secretKey,

            {expiresIn: "1h"}
        )

        return token
}