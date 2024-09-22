var express = require('express');
var router = express.Router();
var controllerApi = require('../controller/controllerApi.js');

router.post('/cadLivro', controllerApi.api_cadLivro);
router.put('/alteraLivro/:_id', controllerApi.api_alteraLivro);
router.get('/consultaLivro/:_id', controllerApi.api_consultaLivro);
router.delete('/deletaLivro/:_id', controllerApi.api_deletaLivro);

module.exports = router;