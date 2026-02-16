import { Router } from 'express'
import { login } from '../controllers/users.controllers.js'
import { criaUsuario } from '../controllers/users.controllers.js'
import { listaUsuario } from '../controllers/users.controllers.js'
import { editaUsuario } from '../controllers/users.controllers.js'
import { retornaUsuarioAtual } from '../controllers/users.controllers.js'
import autenticacaoJwt from '../middlewares/authJwt.js'
import { permitir } from '../middlewares/authJwt.js'

const usersRouters = Router() 

usersRouters.post('/login', login)
usersRouters.post('/criar', autenticacaoJwt, permitir('admin'), criaUsuario)
usersRouters.get('/listar', autenticacaoJwt, permitir('admin'), listaUsuario)
usersRouters.patch('/editar/:id/perfil', autenticacaoJwt, permitir('admin'), editaUsuario)
usersRouters.get('/me', autenticacaoJwt, retornaUsuarioAtual)

export default usersRouters