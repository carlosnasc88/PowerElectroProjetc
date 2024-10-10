async function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação simples
    if (!nome || !email || !senha) {
        alert('Preencha todos os campos');
        return;
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:5500/usuarios/cadastrar', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        const data = await response.json();
        alert(data.message);
        document.getElementById('cadastro-form').reset();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar o usuário');
    }
}
