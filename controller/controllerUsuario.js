const User = require('../model/userMongo.js');

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

