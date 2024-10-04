const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentosController');

// Rota para adicionar um novo apartamento
router.post('/', apartamentoController.adicionarApartamento);

// Rota para obter todos os inquilinos
router.get('/', apartamentoController.obterApartamento);

// Rota para obter um inquilino por ID
router.get('/:id', apartamentoController.obterApartamentoId);

// Rota para atualizar um inquilino
router.put('/:id', apartamentoController.atualizarApartamento);

// Rota para deletar um inquilino
router.delete('/:id', apartamentoController.deletarApartamento);

module.exports = router;
