document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formCadastroCasa');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const numeroap = document.getElementById('numeroap').value;
        const bloco = document.getElementById('bloco').value;
        const numerorel = document.getElementById('numerorel').value;
        const kwhinicial = document.getElementById('kwhinicial').value;
        const kwhatual = document.getElementById('kwhatual').value;
        const valorKwh = document.getElementById('valorKwh').value;

        // Monta o objeto com os dados do apartamento
        const dadosCasa = {
            numeroap,
            bloco,
            numerorel,
            kwhinicial: parseFloat(kwhinicial), // Certifique-se de que esses valores sejam números
            kwhatual: parseFloat(kwhatual),
            ativo: true, // Define como ativo por padrão
            valorKwh: parseFloat(valorKwh)
        };

        // Faz a requisição para o backend
        fetch('http://localhost:5500/apartamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCasa)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Erro desconhecido');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            document.getElementById('error-message').textContent = 'Apartamento cadastrado com sucesso!';
            document.getElementById('error-message').className = 'success-message'; // Aplica a classe de sucesso

            // Limpa os campos do formulário
            form.reset(); // Isso limpa todos os campos do formulário
        })
        .catch(error => {
            console.error('Erro:', error);
            // Exibe a mensagem de erro específica retornada pela API
            document.getElementById('error-message').textContent = 'Erro: ' + error.message;
            document.getElementById('error-message').className = 'error-message'; // Aplica a classe de erro
        });
    });
});
