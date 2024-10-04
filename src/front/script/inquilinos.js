
//-------Cadastro Inquilono-------//
function validarCadastroInquilino() {
    const errorMessage = document.getElementById('error-message');
   // errorMessage.textContent = ''; // Limpa mensagens de erro anteriores

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const numerorel = document.getElementById('numerorel').value;
    const bloco = document.getElementById('bloco').value;
    const kwhatual = parseFloat(document.getElementById('kwhatual').value);

    if (!nome || !cpf || !numerorel || !bloco || isNaN(kwhatual)) {
        errorMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
        return false;
    }

    return true;
}

function salvarInquilino() {
    const form = document.getElementById('formCadastroInquilino');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            if (!validarCadastroInquilino()) {
                return; // Se a validação falhar, não envie os dados
            }

            // Obtém os valores dos campos do formulário
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const numerorel = document.getElementById('numerorel').value;
            const bloco = document.getElementById('bloco').value;
            const kwhatual = parseFloat(document.getElementById('kwhatual').value) || 0;

            // Cria um objeto com os dados
            const inquilino = {
                nome,
                cpf,
                numerorel,
                bloco,
                kwhatual
            };

            // Envia os dados para o servidor
            fetch('http://localhost:5500/inquilinos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inquilino)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Dados salvos no servidor:', data);
                window.location.href = 'listagemInquilinos.html';
            })
            .catch(error => {
                console.error('Erro ao enviar dados para o servidor:', error);
            });
        });
    } else {
        console.error('Formulário não encontrado');
    }
}
