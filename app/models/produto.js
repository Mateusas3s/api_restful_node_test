import mongoose, { Schema } from 'mongoose'

var ProdutoSchema = new Schema({

    nome: String,
    preco: Number,
    descricao: String

})

export const Produto = mongoose.model('Produto', ProdutoSchema)