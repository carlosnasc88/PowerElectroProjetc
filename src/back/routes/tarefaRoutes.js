const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefaController');

// Lista todas as tarefas
router.get('/', (req, res) => {
    try {
        tarefasController.listarTarefas(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar as tarefas' });
    }
});

// Cria uma nova tarefa
router.post('/', (req, res) => {
    try {
        tarefasController.criarTarefa(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
});

// Atualiza uma tarefa existente
router.put('/:id', (req, res) => {
    try {
        tarefasController.atualizarTarefa(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
});

// Exclui uma tarefa
router.delete('/:id', (req, res) => {
    try {
        tarefasController.excluirTarefa(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir a tarefa' });
    }
});

module.exports = router;
