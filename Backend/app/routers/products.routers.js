import { autenticacaoJwtAdmin } from '../middlewares/authJwt.js'
import { criaProduto } from '../controllers/products.controllers.js'
import { Router } from 'express'

const productsRouters = Router()

productsRouters.post('/criar', autenticacaoJwtAdmin, criaProduto)

export default productsRouters