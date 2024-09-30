exports.adicionarApartamento = (req, res) => {
    const { numeroap, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal } = req.body;

    // Validação básica
    if (!numeroap || !bloco || !numerorel || isNaN(kwhinicial) || isNaN(kwhatual) || isNaN(valorKwh)) {
        return res.status(400).json({ message: 'Dados inválidos. Verifique os campos.' });
    }

    if (kwhatual < kwhinicial) {
        return res.status(400).json({ message: 'O Kwh Atual não pode ser menor que o Kwh Inicial.' });
    }

    const query = 'INSERT INTO apartamentos (numeroap, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    connection.query(query, [numeroap, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal], (err, results) => {
        if (err) {
            console.error('Erro ao salvar no banco de dados:', err);
            res.status(500).json({ message: 'Erro ao salvar no banco de dados' });
            return;
        }
        res.status(200).json({ message: 'Apartamento cadastrado com sucesso' });
    });
};




// GET - Obter todos os apartamentos
app.get('http://localhost:5500/apartamentos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM apartamentos');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao obter apartamentos:', err);
        res.status(500).json({ error: 'Erro ao obter apartamentos' });
    }
});


// POST - Criar um novo apartamento
app.post('http://localhost:5500/apartamentos', async (req, res) => {
    const { numero, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal } = req.body;
    try {
        const query = `
            INSERT INTO apartamentos (numero, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`;
        const values = [numero, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao salvar apartamento:', err);
        res.status(500).json({ error: 'Erro ao salvar apartamento' });
    }
});



// GET - Obter um apartamento por ID
app.get('http://localhost:5500/apartamentos/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM apartamentos WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Apartamento não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao obter apartamento:', err);
        res.status(500).json({ error: 'Erro ao obter apartamento' });
    }
});


// PUT - Atualizar um apartamento
app.put('http://localhost:5500/apartamentos/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { numero, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal } = req.body;
    try {
        const query = `
            UPDATE apartamentos
            SET numero = $1, bloco = $2, numerorel = $3, kwhinicial = $4, kwhatual = $5, kwhTotal = $6, valorKwh = $7, valorTotal = $8
            WHERE id = $9
            RETURNING *`;
        const values = [numero, bloco, numerorel, kwhinicial, kwhatual, kwhTotal, valorKwh, valorTotal, id];
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Apartamento não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao atualizar apartamento:', err);
        res.status(500).json({ error: 'Erro ao atualizar apartamento' });
    }
});


// DELETE - Deletar um apartamento
app.delete('http://localhost:5500/apartamentos/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('DELETE FROM apartamentos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Apartamento deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Apartamento não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao deletar apartamento:', err);
        res.status(500).json({ error: 'Erro ao deletar apartamento' });
    }
});

