async function cadastrarUsuario() {
    const nome_completo = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipoUsuario = document.getElementById('tipodesusuario').value;  // Pegando o tipo de usuário

    // Validação simples
    if (!nome_completo || !email || !senha || !tipoUsuario) {
        alert('Preencha todos os campos');
        return;
    }

    const usuario = {
        nome: nome_completo,
        email: email,
        senha: senha,
        tipoUsuario: tipoUsuario  // Enviando o tipo de usuário para o backend
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
