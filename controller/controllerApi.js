const Livro = require('../model/livrosMongo.js');
const User = require('../model/userMongo.js');

exports.api_cadLivro = async function (req, res) {
    var livro = req.body;
    try {
        await Livro.cadLivro(livro)
        var msg = {
            msg: "Livro cadastrado com sucesso!"
        }
    } catch (error) {
        var msg = {
            msg: "Erro ao cadastrar o livro"
        }
    }

    res.json(msg)
}

exports.api_alteraLivro = async function (req, res) {
    var livro = req.body;
    var id = req.params._id
    livro._id = id

    try {
        await Livro.alteraLivro(livro)
        var msg = {
            msg: "Livro alterado com sucesso!"
        }
    } catch (error) {
        var msg = {
            msg: "Erro ao cadastrar o livro"
        }
    }

    res.json(msg)
}

exports.api_consultaLivro = async function (req, res) {
    var id = req.params._id

    try {
        var livro = await Livro.consulta(id)
        res.json(livro)

    } catch (error) {
        var msg = {
            msg: "Erro ao consultar o livro, verifique o id."
        }
        res.json(msg)
    }

}

exports.api_deletaLivro = async function (req, res) {
    var id = req.params._id

    try {
        await Livro.deleta(id)
        var msg = {
            msg: "Livro deletado."
        }
    } catch (error) {
        var msg = {
            msg: "Erro ao consultar o livro, verifique o id."
        }
    }
    res.json(msg)

}