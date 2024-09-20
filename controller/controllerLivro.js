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

    try {
        await Livro.cadLivro(titulo, genero, texto, autor, editora, tag);
        res.redirect('/');
    } catch (erro) {
        console.log("nao cadastrado")
        res.redirect('/');
    }
};

exports.alteraLivro_get = async function (req, res) {

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

    let dataInicioV = false;
    let dataFimV = false;
    let dataInicioFormatada, dataFimFormatada;

    if (Array.isArray(livro.progressoHistorico) && livro.progressoHistorico.length > 0) {
        const dataInicio = new Date(livro.progressoHistorico[0].dataInicio);
        dataInicioFormatada = dataInicio.toLocaleDateString("pt-BR");
        livro.progressoHistorico[0].dataInicio = dataInicioFormatada;
        dataInicioV = true;
    }

    if (Array.isArray(livro.progressoHistorico) && livro.progressoHistorico.length > 0) {
        const data = new Date(livro.progressoHistorico[0].data);
        var dataFormatada = data.toLocaleDateString("pt-BR");
        livro.progressoHistorico[0].data = dataFormatada;
    }

    if (Array.isArray(livro.resenha) && livro.resenha.length > 0) {
        const dataFim = new Date(livro.resenha[0].dataFim);
        dataFimFormatada = dataFim.toLocaleDateString("pt-BR");
        livro.resenha[0].dataFim = dataFimFormatada;
        dataFimV = true;
    }

    const contexto = {
        titulo_pagina: "Detalhes",
        livro: livro,
        dataInicioV: dataInicioV,
        condicao: livro.progresso === 100,
        dt: dataInicioFormatada,
        dtF: dataFimFormatada,
        dataFimV: dataFimV
    };

    res.render('consultaLivro', contexto)
}

exports.get_atualizarProgresso = async function (req, res) {
    console.log("chegou no altera get")
    var id = req.params._id
    var livro = await Livro.consulta(id);

    var condicao = false
    if (livro.resenha) {
        condicao = true;
    }

    var condicaoLivro = false
    if (livro.progresso == 100) {
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
    const { percentual, comentario, dataInicio } = req.body;
    const id = req.params._id;

    const dataFormatada = new Date(dataInicio + "T00:00:00");

    await Livro.atualizarProgresso(id, percentual, comentario, dataFormatada);
    res.redirect('/');
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
    const { resenha, estrela, titulo_resenha, dataFim } = req.body;
    const id = req.params._id;

    const dataFormatada = new Date(dataFim + "T00:00:00");

    await Livro.criarResenha(id, titulo_resenha, resenha, estrela, dataFormatada);
    res.redirect('/');
}


