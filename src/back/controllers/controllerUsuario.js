const express = require('express');
const router = express.Router();

// Middleware para verificar permissão
function verificarPermissao(permissaoRequerida) {
    return (req, res, next) => {
        const { tipoUsuario } = req.body;

        if (tipoUsuario === 'Sindico' && permissaoRequerida === 'acesso_total') {
            next();  // Permitir acesso
        } else {
            return res.status(403).json({ message: 'Acesso negado' });
        }
    };
}

// Rota para cadastrar usuário
router.post('/cadastrar', (req, res) => {
    const { nome: nome_completo, email, senha, tipoUsuario } = req.body;

    // Validação simples
    if (!nome_completo || !email || !senha || !tipoUsuario) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    // Lógica para salvar o usuário no banco de dados (fictício aqui)
    // Pode substituir por chamada ao banco real
    const usuario = { nome: nome_completo, email, senha, tipoUsuario };
    console.log('Usuário cadastrado:', usuario);

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Exemplo de rota protegida: acesso apenas para síndico
router.get('/modulos', verificarPermissao('acesso_total'), (req, res) => {
    res.json({ message: 'Acesso aos módulos permitido para o síndico' });
});

// Exemplo de outra rota protegida (cadastros)
router.get('/cadastros', verificarPermissao('acesso_total'), (req, res) => {
    res.json({ message: 'Acesso aos cadastros permitido para o síndico' });
});

// Exemplo de outra rota protegida (listagens)
router.get('/listagens', verificarPermissao('acesso_total'), (req, res) => {
    res.json({ message: 'Acesso às listagens permitido para o síndico' });
});

module.exports = router;
