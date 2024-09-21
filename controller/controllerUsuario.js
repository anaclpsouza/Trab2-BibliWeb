const User = require('../model/userMongo.js');
const Livro = require('../model/livrosMongo.js');

exports.cadUsuario_get = async function (req, res) {
    const contexto = {
        titulo_pagina: "Cadastro de Perfil"
    };
    res.render('cadUsuario', contexto);
};

exports.cadUsuario = async function (req, res) {
    const { nome, avatar } = req.body;

    try {
        await User.cadUsu(nome, avatar);

        res.redirect('/');

    } catch (erro) {
        res.json({ mensagem: 'Erro ao cadastrar usuário' });
    }
};

exports.alteraUsuario_get = async function (req, res) {
    var id = req.params._id
    var usuario = await User.consultaUsu(id);

    const contexto = {
        titulo_pagina: "Editar de Perfil",
        usuario: usuario
    };
    res.render('alteraUsuario', contexto);
};

exports.alteraUsuario = async function (req, res) {
    const { nome, avatar } = req.body;
    const id = req.params._id

    try {
        await User.alteraUsu(id, nome, avatar);

        res.redirect('/');

    } catch (erro) {
        res.json({ mensagem: 'Erro ao editar usuário' });
    }
};


exports.estatisticas = async function (req, res) {
    const id = req.params._id
    var usuario = await User.consultaUsu(id);
    let qntRomance = await Livro.qtdGenero("Romance")
    let qntFantasia = await Livro.qtdGenero("Fantasia")
    let qntFiccao = await Livro.qtdGenero("Ficcao")
    let qntDistopia = await Livro.qtdGenero("Distopia")
    let qntSuspense = await Livro.qtdGenero("Suspense")
    let qntTerror = await Livro.qtdGenero("Terror")
    let qntOutros = await Livro.qtdGenero("Outros")

    console.log(qntRomance)
    let qntFisicos = await Livro.qntTag("Físico")
    let qntEbook = await Livro.qntTag("Ebook")
    let qntDesejo = await Livro.qntTag("Desejo")

    const livroStatus = await Livro.statusLivros();
    console.log(livroStatus)

    contexto = {
        titulo_pagina: "Estatísticas",
        qntRomance: qntRomance,
        qntFantasia: qntFantasia,
        qntFiccao: qntFiccao,
        qntDistopia: qntDistopia,
        qntSuspense: qntSuspense,
        qntTerror: qntTerror,
        qntOutros: qntOutros,
        usuario: usuario,
        qntFisicos: qntFisicos,
        qntEbook: qntEbook,
        qntDesejo: qntDesejo,
        lidos: Number(livroStatus.lidos),
        lendo: Number(livroStatus.lendo),
        naoLidos: Number(livroStatus.naoLidos),
        abandonados: Number(livroStatus.abandonado)
    }

    res.render('estatisticas', contexto)

}
