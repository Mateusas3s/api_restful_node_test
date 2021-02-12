import express from 'express'
import bodyParser from 'body-parser'

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.port || 8000

var router = express.Router()

router.get('/', (req, res) => {
        res.json({ message: "Hello World!" })
    })

app.use('/api', router)

app.listen(port)
console.log(`Iniciando app na porta ${port}`)