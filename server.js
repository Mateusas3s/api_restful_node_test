import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Produto } from './app/models/produto'

// conecção com pela cloud
mongoose.connect('mongodb+srv://mateusas3s:1234@cluster0.h5nha.mongodb.net/cluster0?retryWrites=true&w=majority',
    {useUnifiedTopology: true}
)

// conecção pelo banco local
// mongoose.connect('mongodb://localhost:27017/cluster0')

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.port || 8000
var router = express.Router()

// Rotas API
router.use((req, res, next) => {
        console.log("Tá funfando!")
        next()
    })

router.get('/', (req, res) => {
    res.json({ message: "Bem-vindo a nossa Loja Api!" })
})

router.route('/produtos')

    .post((req, res) => {
        var produto = new Produto()
        
        produto.nome = req.body.nome
        produto.preco = req.body.preco
        produto.descricao = req.body.descricao

        produto.save((error) => {
            if (error)
                res.send(`Erro ao tentar salvar o produto: ${error}`)
            res.json({ message: 'Produto cadastrado com sucesso!' })

        })
    })

    .get((req, res) => {
        Produto.find((error, produto) => {
            if (error) 
                res.send(`Erro a tentar selecionar todos os produtos: ${error}`)    
            res.json(produto)
        })
    })

app.use('/api', router)

app.listen(port)
console.log(`Funcionando app na porta ${port}`)