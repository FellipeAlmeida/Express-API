import jwt from 'jsonwebtoken'
import { env } from '../config.js'

// verifica token (qualquer um)

export default function autenticacaoJwt(req, res, next){
    const auth = req.headers.authorization

    if (!auth){
        return res.status(401).json({erro: "Token não enviado"})
    }

    try {
        const decoded = jwt.verify(auth, env.secretKey)
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({erro: "Token inválido ou expirado."})
    }
}

// verifica token admin

export function autenticacaoJwtAdmin(req, res, next){
    const auth = req.headers.authorization

    if (!auth){
        return res.status(401).json({erro: "Token não enviado"})
    }

    try {
        const decoded = jwt.verify(auth, env.secretKey)
        req.user = decoded

        if (decoded.perfil != 'admin'){
            return res.status(403).json({erro: "Não autorizado."})
        }

        next()
    } catch {
        return res.status(401).json({erro: "Token inválido ou expirado."})
    }
}

// verifica token estoquista

export function autenticacaoJwtEstoquista(req, res, next){
    const auth = req.headers.authorization

    if (!auth){
        return res.status(401).json({erro: "Token não enviado"})
    }

    try {
        const decoded = jwt.verify(auth, env.secretKey)
        req.user = decoded

        if (decoded.perfil != 'estoquista'){
            return res.status(403).json({erro: "Não autorizado."})
        }
        
        next()
    } catch {
        return res.status(401).json({erro: "Token inválido ou expirado."})
    }
}

// verifica token consultor

export function autenticacaoJwtConsultor(req, res, next){
    const auth = req.headers.authorization

    if (!auth){
        return res.status(401).json({erro: "Token não enviado"})
    }

    try {
        const decoded = jwt.verify(auth, env.secretKey)
        req.user = decoded

        if (decoded.perfil != 'consultor'){
            return res.status(403).json({erro: "Não autorizado."})
        }
        
        next()
    } catch {
        return res.status(401).json({erro: "Token inválido ou expirado."})
    }
}