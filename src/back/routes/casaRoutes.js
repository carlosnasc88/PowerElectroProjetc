const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentosController');

// Rota para adicionar um novo apartamento
router.post('/', apartamentoController.adicionarApartamento);

module.exports = router;
