import express from 'express'
import userRoutes from './routers/users.routers.js'
import productsRouters from './routers/products.routers.js'
import dotenv from 'dotenv'

dotenv.config()
export const app = express()

app.get('/', (req, res) => {
    res.send("Servidor express rodando!")
})

app.use(express.json())
app.use('/users', userRoutes)
app.use('/products', productsRouters)

app.listen(5000, () => {
    console.log("servidor rodando na porta 5000")
})