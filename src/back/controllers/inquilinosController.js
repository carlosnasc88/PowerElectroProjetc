// controllers/inquilinosController.js
const pool = require('../database/db');

// Adicionar um novo inquilino
exports.adicionarInquilino = async (req, res) => {
    const { nome, cpf, numerorel, bloco, kwhatual, apartamento_id } = req.body;

    try {
        const query = `
            INSERT INTO inquilinos (nome, cpf, numerorel, bloco, kwhatual, apartamento_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
        const values = [nome, cpf, numerorel, bloco, kwhatual, apartamento_id];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao salvar inquilino:', err);
        res.status(500).json({ error: 'Erro ao salvar inquilino' });
    }
};

// Obter todos os inquilinos
exports.obterInquilinos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM inquilinos');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao obter inquilinos:', err);
        res.status(500).json({ error: 'Erro ao obter inquilinos' });
    }
};

// Obter um inquilino por ID
exports.obterInquilinoPorId = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM inquilinos WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Inquilino não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao obter inquilino:', err);
        res.status(500).json({ error: 'Erro ao obter inquilino' });
    }
};

// Atualizar um inquilino
exports.atualizarInquilino = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nome, cpf, numerorel, bloco, kwhatual, apartamento_id } = req.body;
    try {
        const query = `
            UPDATE inquilinos
            SET nome = $1, cpf = $2, numerorel = $3, bloco = $4, kwhatual = $5, apartamento_id = $6
            WHERE id = $7
            RETURNING *`;
        const values = [nome, cpf, numerorel, bloco, kwhatual, apartamento_id, id];
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Inquilino não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao atualizar inquilino:', err);
        res.status(500).json({ error: 'Erro ao atualizar inquilino' });
    }
};

// Deletar um inquilino
exports.deletarInquilino = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('DELETE FROM inquilinos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Inquilino deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Inquilino não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao deletar inquilino:', err);
        res.status(500).json({ error: 'Erro ao deletar inquilino' });
    }
};
