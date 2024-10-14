document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, senha }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Se o login for bem-sucedido
                    alert('Login bem-sucedido!');
                    window.location.href = '/src/front/home.html'; // Redirecionar para a página inicial
                } else {
                    // Se o login falhar
                    alert(data.message || 'Usuário ou senha incorretos.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao fazer login. Tente novamente mais tarde.');
            }
        });
    } else {
        console.error('Formulário não encontrado.');
    }
});
