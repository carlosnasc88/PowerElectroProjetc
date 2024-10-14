const db = require('../database/db'); // Aqui você importa a conexão com o banco de dados

// Função para cadastrar o usuário
const cadastrarUsuario = (req, res) => {
    const { nome: nome_completo, email, senha, tipoUsuario } = req.body;

    // Validação simples
    if (!nome_completo || !email || !senha || !tipoUsuario) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    // Query SQL para inserir o usuário
    const query = `
        INSERT INTO usuarios (nome_completo, email, senha, tipo_usuario)
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const values = [nome_completo, email, senha, tipoUsuario];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
        // Retorna o usuário cadastrado
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: result.rows[0] });
    });
};

module.exports = { cadastrarUsuario };
