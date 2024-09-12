const Livro = require('../model/livrosMongo.js');


exports.cadLivro_get = async function (req, res) {
    const contexto = {
        titulo_pagina: "Cadastro de Livros"
    };
    res.render('cadLivro', contexto);
};

exports.cadLivro = async function (req, res) {
    const { titulo, data, genero, texto, autor, editora } = req.body;
    console.log(req.body)
    try {
        await Livro.cadLivro(titulo, data, genero, texto, autor, editora);
        res.redirect('/');
    } catch (erro) {
        console.error('Erro ao cadastrar livro:', erro);
        res.json({ mensagem: 'Erro ao cadastrar livro' });
    }
};

exports.consulta = async function (req, res) {
    var id = req.params._id
    var livro = await Livro.consulta(id)


    contexto = {
        titulo_pagina: "Detalhes",
        livro: livro,
    };
    res.render('consultaLivro', contexto)
}

exports.get_atualizarProgresso = async function (req, res) {
    console.log("chegou no altera get")
    var id = req.params._id
    var livro = await Livro.consulta(id)


    const contexto = {
        titulo_pagina: "Atualizar Progresso",
        livros: livro

    };
    res.render('atualizarProgresso', contexto);
};


exports.post_atualizarProgresso = async function (req, res) {
    const { percentual, comentario } = req.body;
    const id = req.params._id;
    

    await Livro.atualizarProgresso(id, percentual, comentario)

    // if (resultado) {
    //     res.json({ mensagem: 'Progresso adicionado com sucesso!' });
    // } else {
    //     res.json({ mensagem: 'Livro não encontrado.' });
    // }
   
    res.redirect('/')
}


exports.deleta = async function (req, res) {
    var id = req.params._id
    await Livro.deleta(id);


    // retorno = {
    //     retorno: "Livro Deletado!"
    // }

    // res.json(retorno);
    res.redirect('/');
}



