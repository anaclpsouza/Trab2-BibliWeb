var express = require('express');
var router = express.Router();
var controllerLivro = require('../controller/controllerLivro.js');

router.get('/cadLivro', controllerLivro.cadLivro_get);

router.post('/cadLivro', controllerLivro.cadLivro);

router.get('/atualizarProgresso/:_id', controllerLivro.get_atualizarProgresso);

router.post('/atualizarProgresso/:_id', controllerLivro.post_atualizarProgresso);

router.get('/consulta/:_id', controllerLivro.consulta);

router.get('/deleta/:_id', controllerLivro.deleta);

module.exports = router;
