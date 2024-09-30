const express = require('express');
const router = express.Router();
const inquilinoController = require('..//controllers/inquilinosController');

// Rota para adicionar um novo inquilino
router.post('/', inquilinoController.adicionarInquilino);

module.exports = router;
