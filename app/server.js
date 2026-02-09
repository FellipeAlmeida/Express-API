import express from 'express'
import userRoutes from './routers/users.routers.js'
import dotenv from 'dotenv'

dotenv.config()
export const app = express()

app.get('/', (req, res) => {
    res.send("Servidor express rodando!")
})

app.use(express.json())
app.use(userRoutes)

app.listen(5000, () => {
    console.log("servidor rodando na porta 5000")
})