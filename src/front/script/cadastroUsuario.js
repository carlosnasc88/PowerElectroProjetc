function cadastrarUsuario() {
    // Obtendo os valores do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação simples
    if (!nome || !email || !senha) {
        alert('Preencha todos os campos');
        return;
    }

    // Criação do objeto usuário
    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Simulação de envio de dados (pode ser substituído por um fetch para um backend)
    console.log('Usuário cadastrado:', usuario);

    // Limpar os campos após o cadastro
    document.getElementById('cadastro-form').reset();

    alert('Usuário cadastrado com sucesso!');
}
