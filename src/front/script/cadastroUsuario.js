async function cadastrarUsuario() {
    const nome_completo = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipoUsuario = document.getElementById('tipodesusuario').value;

    // Validação simples
    if (!nome_completo || !email || !senha || !tipoUsuario) {
        alert('Preencha todos os campos');
        return;
    }

    const usuario = {
        nome: nome_completo,
        email: email,
        senha: senha,
        tipoUsuario: tipoUsuario
    };

    try {
        const response = await fetch('http://localhost:5500/usuarios/cadastrar', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        alert(data.message);
        

        // Reseta o formulário e redireciona para a página de login
        document.getElementById('cadastro-form').reset();
        window.location.href = '/src/front/LoginUsuario.html'; // Redireciona após cadastro bem-sucedido

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar o usuário');
    }
}
