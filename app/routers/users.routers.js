import jwt from 'jsonwebtoken'
import { Router } from 'express'
import pool from '../database.js'

const routers = Router() 

routers.post('/login', (req, res) => {
    const { usuario, senha } = req.body

    if (!usuario || !senha){
        res.status(400).json({erro: "Usuário e senha obrigatórios."})
    }

    pool.query(`
        CREATE TABLE IF NOT EXISTS users(id integer primary key, 
        usuario varchar(100), 
        senha varchar(100));`)
    
    const user = pool.query(`
        INSERT INTO users(id, usuario, senha) 
        VALUES(5, '${usuario}', '${senha}');`)

        if (user){
            return res.status(201).json({mensagem: "Usuário criado"})
        }
})

export default routers