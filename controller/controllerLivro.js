const Livro = require('../model/livrosMongo.js');


exports.cadLivro_get = async function (req, res) {
    const contexto = {
        titulo_pagina: "Cadastro de Livros"
    };
    res.render('cadLivro', contexto);
};

exports.cadLivro = async function (req, res) {
    const titulo = req.body.titulo;
    const genero = req.body.genero;
    const texto = req.body.texto;
    const autor = req.body.autor;
    const editora = req.body.editora;
    const tag = req.body.tag;

    console.log("titulo do req" + titulo)
    console.log(req.body)
    try {
        await Livro.cadLivro(titulo, genero, texto, autor, editora, tag);
        res.redirect('/');
    } catch (erro) {
        console.log("nao cadastrado")
        res.redirect('/');
    }
};

exports.alteraLivro_get = async function (req, res) {
    console.log("chegou no get")
    const id = req.params._id
    const livro = await Livro.consulta(id);

    var ficcao = false;
    var romance = false;
    var fantasia = false;
    var distopia = false;
    var suspense = false;
    var terror = false;
    var outros = false;

    switch (livro.genero) {
        case "Ficcao":
            ficcao = true;
            break;
        case "Romance":
            romance = true;
            break;
        case "Fantasia":
            fantasia = true;
            break;
        case "Distopia":
            distopia = true;
            break;
        case "Suspense":
            suspense = true;
            break;
        case "Terror":
            terror = true;
            break;
        case "Outros":
            outros = true;
            break;
    }

    const contexto = {
        titulo_pagina: "Ateração de Livros",
        livro: livro,
        ficcao: ficcao,
        romance: romance,
        fantasia: fantasia,
        distopia: distopia,
        suspense: suspense,
        terror: terror,
        outros: outros
    };
    res.render('alteraLivro', contexto);
};

exports.alteraLivro = async function (req, res) {
    const titulo = req.body.titulo; 
    const genero = req.body.genero;
    const texto = req.body.texto;
    const autor = req.body.autor;
    const editora = req.body.editora;
    const tag = req.body.tag;

    
    const id = req.params._id

    try {
        await Livro.alteraLivro(id, titulo, genero, texto, autor, editora, tag);
        res.redirect('/');

    } catch (erro) {
        console.log("nao cadastrado")
        res.redirect('/');
    }
};

exports.consulta = async function (req, res) {
    var id = req.params._id
    var livro = await Livro.consulta(id)
    var condicao = false
    if (livro.progresso == 100){
        condicao = true;
    }
    try {
        var dataInicio = new Date(livro.dataInicio);
        var dataFormatada = dataInicio.toLocaleDateString("pt-BR")
        livro.dataInicio = dataFormatada
        dataInicio = true
    } catch {
        dataInicio = false
    }

    contexto = {
        titulo_pagina: "Detalhes",
        livro: livro,
        dataInicio: dataInicio,
        condicao: condicao
    };
    res.render('consultaLivro', contexto)
}

exports.get_atualizarProgresso = async function (req, res) {
    console.log("chegou no altera get")
    var id = req.params._id
    var livro = await Livro.consulta(id);

    var condicao = false
    if (livro.resenha){
        condicao = true;
    }

    var condicaoLivro = false
    if (livro.progresso == 100){
        condicaoLivro = true;
    }

    const contexto = {
        titulo_pagina: "Atualizar Progresso",
        livros: livro,
        condicao: condicao,
        condicaoLivro: condicaoLivro
    };
    res.render('atualizarProgresso', contexto);
};


exports.post_atualizarProgresso = async function (req, res) {
    const { percentual, comentario } = req.body;
    const id = req.params._id;
    

    var livro = await Livro.consulta(id)

    await Livro.atualizarProgresso(id, percentual, comentario)

    res.redirect('/')
}


exports.deleta = async function (req, res) {
    var id = req.params._id
    await Livro.deleta(id);

    res.redirect('/');
}

exports.get_criarResenha = async function (req, res) {
    var id = req.params._id
    var livro = await Livro.consulta(id)

    const contexto = {
        titulo_pagina: "Atualizar Progresso",
        livros: livro

    };

    res.render('atualizarProgresso', contexto);
}


exports.post_criarResenha = async function (req, res) {
    const resenha = req.body.resenha;
    const estrela = req.body.estrela;
    const titulo_resenha = req.body.titulo_resenha
    const dataFim = req.body.dataFim
    const id = req.params._id;

    await Livro.criarResenha(id, titulo_resenha, resenha, estrela, dataFim)

    res.redirect('/')
}


