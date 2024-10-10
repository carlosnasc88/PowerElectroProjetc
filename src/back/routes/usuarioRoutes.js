const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Definindo a rota POST para cadastro de usuários
router.post('/cadastrar', usuarioController.cadastrarUsuario);

module.exports = router;
