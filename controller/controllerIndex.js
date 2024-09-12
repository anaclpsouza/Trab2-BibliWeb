const Livro = require('../model/livrosMongo.js');
const User = require('../model/userMongo.js');

exports.tela_principal = async function (req, res) {
    try {
        const livros = await Livro.lista();
        const user = await User.listaU()


        const contexto = {
            titulo_pagina: "BibliWeb",
            livros: livros,
            usuario: user
        };
        res.render('index', contexto);
    } catch (erro) {
        console.error('Erro ao carregar a tela principal:', erro);
        res.status(500).render('error', { mensagem: 'Erro ao carregar a página principal' });
    }
};



