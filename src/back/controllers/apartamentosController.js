// controllers/apartamentosController.js
const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Rota para cadastrar apartamento
router.post('/', (req, res) => {
    console.log('Dados recebidos:', req.body); // Log dos dados recebidos

    const { numeroap, bloco, numerorel, kwhinicial, kwhatual, valorKwh } = req.body;

    // Verifique se os dados são válidos
    if (!numeroap || !bloco || !numerorel || !kwhinicial || !kwhatual || !valorKwh) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const ativo = true;

    // Ajustando os placeholders para iniciar do $1
    db.query(
        'INSERT INTO apartamentos (numeroap, bloco, numerorel, kwhinicial, kwhatual, ativo, valorKwh) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [numeroap, bloco, numerorel, kwhinicial, kwhatual, ativo, valorKwh],
        (err, result) => {
            if (err) {
                console.error('Erro ao salvar no banco:', err);
                return res.status(500).json({ error: 'Erro ao salvar os dados' });
            }
            res.status(201).json({ message: 'Apartamento cadastrado com sucesso!' });
        }
    );
});


// Rota para obter apartamentos ativos
router.get('/', (req, res) => {
    console.log('Recebendo requisição para obter apartamentos ativos');
    const ativo = req.query.ativo === 'true';

    const query = 'SELECT * FROM apartamentos WHERE ativo = $1';
    db.query(query, [ativo], (err, result) => {
        if (err) {
            console.error('Erro ao buscar apartamentos:', err);
            return res.status(500).json({ error: 'Erro ao buscar apartamentos' });
        }
        console.log('Apartamentos encontrados:', result.rows);
        res.status(200).json(result.rows);
    });
});





// Rota para deletar apartamento
router.delete('/:numeroap', (req, res) => {
    const numeroap = req.params.numeroap;

    db.query('DELETE FROM apartamentos WHERE numeroap = $1', [numeroap], (err, result) => {
        if (err) {
            console.error('Erro ao deletar apartamento:', err);
            return res.status(500).json({ error: 'Erro ao deletar apartamento' });
        }
        res.status(200).json({ message: 'Apartamento deletado com sucesso!' });
    });
});


module.exports = router;
