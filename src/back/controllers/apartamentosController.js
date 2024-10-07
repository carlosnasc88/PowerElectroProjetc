const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Função para verificar se o apartamento já existe no mesmo bloco
const verificarApartamentoExistente = (numeroap, bloco) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM apartamentos WHERE numeroap = $1 AND bloco = $2';
        db.query(query, [numeroap, bloco], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.rows.length > 0); // Retorna true se já existir
        });
    });
};

// Rota para cadastrar apartamento
router.post('/', async (req, res) => {
    const { numeroap, bloco, numerorel, kwhinicial, kwhatual, valorKwh, nomeInquilino, cpfInquilino } = req.body;

    if (!numeroap || !bloco || !numerorel || !kwhinicial || !kwhatual || !valorKwh || !nomeInquilino || !cpfInquilino) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verifica se o apartamento já existe no mesmo bloco
        const apartamentoExiste = await verificarApartamentoExistente(numeroap, bloco);

        if (apartamentoExiste) {
            return res.status(409).json({ error: 'Apartamento já cadastrado neste bloco.' });
        }

        const query = `
            INSERT INTO apartamentos (numeroap, bloco, numerorel, kwhinicial, kwhatual, ativo, valorKwh, nome_inquilino, cpf_inquilino)
            VALUES ($1, $2, $3, $4, $5, true, $6, $7, $8)
        `;

        db.query(query, [numeroap, bloco, numerorel, kwhinicial, kwhatual, valorKwh, nomeInquilino, cpfInquilino], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao salvar o apartamento.' });
            }
            res.status(201).json({ message: 'Apartamento cadastrado com sucesso!' });
        });
    } catch (err) {
        console.error('Erro na verificação de apartamento existente:', err);
        res.status(500).json({ error: 'Erro ao verificar apartamento existente.' });
    }
});

// Rota para obter apartamentos ativos
router.get('/', (req, res) => {
    console.log('Recebendo requisição para obter apartamentos ativos');
    const ativo = req.query.ativo === 'true'; // Convertendo string para booleano

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
        }d
        res.status(200).json({ message: 'Apartamento deletado com sucesso!' });
    });
});

module.exports = router;
