import  { permitir }  from '../middlewares/authJwt.js'
import  autenticacaoJwt from '../middlewares/authJwt.js'
import { Router } from 'express'
import { criaMovimentacaoEntrada } from '../controllers/movements.controller.js'
import { criaMovimentacaoSaida } from '../controllers/movements.controller.js'
import { listaMovimentacoes } from '../controllers/movements.controller.js'

const movementsRouters = Router()

movementsRouters.post('/entrada', autenticacaoJwt, permitir(['admin', 'estoquista']), criaMovimentacaoEntrada)
movementsRouters.post('/saida', autenticacaoJwt, permitir(['admin', 'estoquista']), criaMovimentacaoSaida)
movementsRouters.get('/listar', autenticacaoJwt, permitir(['admin', 'estoquista', 'consultor']), listaMovimentacoes)

export default movementsRouters