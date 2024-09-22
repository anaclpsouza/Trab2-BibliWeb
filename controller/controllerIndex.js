const Livro = require('../model/livrosMongo.js');
const User = require('../model/userMongo.js');

exports.tela_principal = async function (req, res) {

    const user = await User.listaU()
    const genero = req.query.genero;
    const formato = req.query.formato;

    const busca = req.body.busca;
    let condicao_busca = false;

    var todos = false;
    const ficcao = genero === 'Ficcao';
    const romance = genero === 'Romance';
    const fantasia = genero === 'Fantasia';
    const distopia = genero === 'Distopia';
    const suspense = genero === 'Suspense';
    const terror = genero === 'Terror';
    const outros = genero === 'Outros';

    let semLivros = "Ainda não há livros cadastrados."

    try {
        let vetorLivros;

        if (genero === 'Todos' || genero === undefined) {
            todos = true;
            vetorLivros = await Livro.lista();
            if (!vetorLivros || vetorLivros.length === 0) {
                semLivros = "Ainda não há livros cadastrados.";
            }
        } else {
            vetorLivros = await Livro.listaGenero(genero);
            if (!vetorLivros || vetorLivros.length === 0) {
                semLivros = "Ainda não há livros deste gênero cadastrados.";
            }
        }

        if (req.body.botaoBusca != undefined) {
            vetorLivros = await Livro.listaBusca(busca)
            condicao_busca = true
            if (!vetorLivros || vetorLivros.length === 0) {
                semLivros = "Ainda não há livros com este título.";
            }
        }
        if (req.body.botaoCancelar != undefined) {
            condicao_busca = false
        }

        vetorLivros.forEach((livro) => {
            switch (livro.genero) {
                case "Romance":
                    livro.Romance = true;
                    break;
                case "Ficcao":
                    livro.Ficcao = true;
                    break;
                case "Fantasia":
                    livro.Fantasia = true;
                    break;
                case "Terror":
                    livro.Terror = true;
                    break;
                case "Suspense":
                    livro.Suspense = true;
                    break;
                case "Distopia":
                    livro.Distopia = true;
                    break;
            }
        });

        const contexto = {
            titulo_pagina: "BibliWeb",
            livros: vetorLivros,
            usuario: user,
            Ficcao: ficcao,
            Romance: romance,
            Fantasia: fantasia,
            Distopia: distopia,
            Suspense: suspense,
            Terror: terror,
            Outros: outros,
            semLivros: semLivros,
            Todos: todos,
            busca: busca,
            condicao_busca: condicao_busca
        };
        res.render('index', contexto);
    } catch (erro) {
        console.error('Erro ao carregar a tela principal:', erro);
    }
}


exports.tela_ajuda = async function (req, res) {
    contexto = {
        titulo_pagina: "Ajuda"
    }
    res.render('ajuda', contexto)
}