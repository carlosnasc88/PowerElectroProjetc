// Controller para cadastrar um novo usuário
const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    // Validação simples
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    try {
        const query = 'INSERT INTO usuarios (nome_completo, email, senha) VALUES ($1, $2, $3)';
        const values = [nome, email, senha];

        await pool.query(query, values);

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
    }
};

module.exports = {
    cadastrarUsuario,
};