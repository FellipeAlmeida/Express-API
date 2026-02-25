import express from 'express'
import userRoutes from './routes/users.routes.js'
import productsRouters from './routes/products.routes.js'
import movementsRouters from '../app/routes/movements.routes.js'
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