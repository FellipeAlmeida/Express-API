import { Router } from 'express'
import { login } from '../controllers/users.controllers.js'
import { criaUsuario } from '../controllers/users.controllers.js'

const usersRouters = Router() 

usersRouters.post('/login', login)
usersRouters.post('/criar', criaUsuario)

export default usersRouters