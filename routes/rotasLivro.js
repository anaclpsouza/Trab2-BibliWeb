var express = require('express');
var router = express.Router();
var controllerLivro = require('../controller/controllerLivro.js');

router.get('/cadLivro', controllerLivro.cadLivro_get);

router.post('/cadLivro', controllerLivro.cadLivro);

router.get('/alteraLivro/:_id', controllerLivro.alteraLivro_get);

router.post('/alteraLivro/:_id', controllerLivro.alteraLivro);

router.get('/atualizarProgresso/:_id', controllerLivro.get_atualizarProgresso);

router.post('/atualizarProgresso/:_id', controllerLivro.post_atualizarProgresso);

router.get('/criarResenha/:_id', controllerLivro.get_criarResenha);

router.post('/criarResenha/:_id', controllerLivro.post_criarResenha);

router.get('/consulta/:_id', controllerLivro.consulta);

router.get('/deleta/:_id', controllerLivro.deleta);


module.exports = router;
