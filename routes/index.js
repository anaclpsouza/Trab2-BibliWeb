var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js');

router.get('/', controllerIndex.tela_principal);
router.get("/filtrar", controllerIndex.tela_principal);
router.get("/ajuda", controllerIndex.tela_ajuda);

module.exports = router;
