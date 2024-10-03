// routes/inquilinosRoutes.js
const express = require('express');
const router = express.Router();
const inquilinoController = require('../controllers/inquilinosController');

// Rota para adicionar um novo inquilino
router.post('/', inquilinoController.adicionarInquilino);

// Rota para obter todos os inquilinos
router.get('/', inquilinoController.obterInquilinos);

// Rota para obter um inquilino por ID
router.get('/:id', inquilinoController.obterInquilinoPorId);

// Rota para atualizar um inquilino
router.put('/:id', inquilinoController.atualizarInquilino);

// Rota para deletar um inquilino
router.delete('/:id', inquilinoController.deletarInquilino);

module.exports = router;
