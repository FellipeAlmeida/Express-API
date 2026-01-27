const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("Servidor express rodando!")
})

app.listen(5000, () => {
    console.log("servidor rodando na porta 5000")
})