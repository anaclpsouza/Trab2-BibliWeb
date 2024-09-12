var express = require('express');
var router = express.Router();
var controllerUsuario = require('../controller/controllerUsuario.js');

router.get('/cadUsuario', controllerUsuario.cadUsuario_get);
router.post('/cadUsuario', controllerUsuario.cadUsuario);

router.get('/alteraUsuario/:_id', controllerUsuario.alteraUsuario_get);
router.post('/alteraUsuario/:_id', controllerUsuario.alteraUsuario);

module.exports = router;