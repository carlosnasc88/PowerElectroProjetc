// src/controllers/loginController.js

const { Client } = require('pg'); // Importar a biblioteca do PostgreSQL

// Configurações do banco de dados
const client = new Client({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

client.connect();

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Query para verificar o usuário no banco de dados
        const result = await client.query('SELECT * FROM usuario WHERE email = $1 AND senha = $2', [email, senha]);

        if (result.rows.length > 0) {
            // Usuário encontrado
            res.status(200).json({ message: 'Login bem-sucedido!' });
        } else {
            // Usuário não encontrado
            res.status(401).json({ message: 'Usuário ou senha incorretos.' });
        }
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    loginUser,
};
