import express from 'express'
import userRoutes from './routers/users.routers.js'
import productsRouters from './routers/products.routers.js'
import movementsRouters from '../app/routers/movements.routers.js'
import dotenv from 'dotenv'

const PORT = process.env.PORT || 5000

dotenv.config()
export const app = express()

app.get('/', (req, res) => {
    res.send("Servidor express rodando!")
})

app.use(express.json())
app.use('/users', userRoutes)
app.use('/products', productsRouters)
app.use('/movements', movementsRouters)

app.listen(PORT, () => {
    console.log("servidor rodando na porta 5000")
})