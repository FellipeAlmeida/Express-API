import  { permitir }  from '../middlewares/authJwt.js'
import  autenticacaoJwt from '../middlewares/authJwt.js'
import { criaProduto } from '../controllers/products.controllers.js'
import { listaProduto } from '../controllers/products.controllers.js'
import { buscaProduto } from '../controllers/products.controllers.js'
import { editaProduto } from '../controllers/products.controllers.js'
import { deletaProduto } from '../controllers/products.controllers.js'
import { alertaBaixoEstoque } from '../controllers/products.controllers.js'
import { Router } from 'express'

const productsRouters = Router()

productsRouters.post('/criar', autenticacaoJwt, permitir(['admin', 'estoquista']), criaProduto)
productsRouters.get('/listar', autenticacaoJwt, listaProduto)
productsRouters.get('/buscar/:id', autenticacaoJwt, buscaProduto)
productsRouters.patch('/editar/:id', autenticacaoJwt, permitir(['admin', 'estoquista']), editaProduto)
productsRouters.delete('/deletar/:id', autenticacaoJwt, permitir('admin'), deletaProduto)
productsRouters.get('/relatorios/baixo-estoque', autenticacaoJwt, permitir(['admin', 'estoquista', 'consultor']), alertaBaixoEstoque)

export default productsRouters