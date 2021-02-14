import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Produto } from './app/models/produto'

// conecção com pela cloud
mongoose.connect('mongodb+srv://mateusas3s:1234@cluster0.h5nha.mongodb.net/cluster0?retryWrites=true&w=majority',
    {useUnifiedTopology: true}
)

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
    
    // Criar produtos
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

    // Listar produtos
    .get((req, res) => {
        Produto.find((error, produto) => {
            if (error) 
                res.send(`Erro a tentar selecionar todos os produtos: ${error}`)    
            res.json(produto)
        })
    })

router.route('/produtos/:produto_id')

    // Listar um produto
    .get((req, res) => {

        Produto.findById(req.params.produto_id, (error, produto) => {
            if(error)
                res.send('Id do produto não encontrado')
            res.json(produto)
        })
    })
    
    // Atualizar atributos do produto
    .put((req, res) => {

        Produto.findById(req.params.produto_id, (error, produto) => {
            if(error)
                res.send('Id do produto não encontrado')

            produto.nome = req.body.nome
            produto.preco = req.body.preco
            produto.descricao = req.body.descricao
            produto.save((error) => {
                if (error) 
                    res.send(`Erro ao atualizar o produto...: ${error}`)
                
                res.json({ message: 'Produto atualizado com sucesso' })
            })
        })
    })

    // Deletar produto
    .delete((req, res) => {

        Produto.remove({
            _id: req.params.produto_id
        },
        (error) => {
            if (error)
                res.send(`Erro ao deletar o produto...: ${error}`)    

            res.json({ message: `Produto deletado com sucesso` })
        })
    })

// Define padrão /api para rotas
app.use('/api', router)

app.listen(port)
console.log(`Funcionando app na porta ${port}`)