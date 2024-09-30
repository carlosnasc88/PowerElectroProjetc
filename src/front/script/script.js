function validarCadastroCasa() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ''; // Limpa mensagens de erro anteriores

    const numeroap = document.getElementById('numeroap').value;
    const bloco = document.getElementById('bloco').value;
    const numerorel = document.getElementById('numerorel').value;
    const kwhinicial = parseFloat(document.getElementById('kwhinicial').value);
    const kwhatual = parseFloat(document.getElementById('kwhatual').value);
    const valorKwh = parseFloat(document.getElementById('valorKwh').value);

    if (!numeroap || !bloco || !numerorel || isNaN(kwhinicial) || isNaN(kwhatual) || isNaN(valorKwh)) {
        errorMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
        return false;
    }

    if (kwhatual < kwhinicial) {
        errorMessage.textContent = 'O Kwh Atual não pode ser menor que o Kwh Inicial.';
        return false;
    }

    return true;
}

function salvarCadastro() {
    console.log('DOM completamente carregado e analisado');

    const form = document.getElementById('formCadastroCasa');
    if (form) {
        console.log('Formulário encontrado');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            if (!validarCadastroCasa()) {
                return; // Se a validação falhar, não envie os dados
            }

            // Obtém os valores dos campos do formulário
            const numeroap = document.getElementById('numeroap').value;
            const bloco = document.getElementById('bloco').value;
            const numerorel = document.getElementById('numerorel').value;
            const kwhinicial = parseFloat(document.getElementById('kwhinicial').value) || 0; 
            const kwhatual = parseFloat(document.getElementById('kwhatual').value) || 0; 
            const valorKwh = parseFloat(document.getElementById('valorKwh').value) || 0; 
            const kwhTotal = kwhatual - kwhinicial; 
            const valorTotal = kwhTotal * valorKwh; 

            // Atualiza o campo oculto com o valor calculado
            document.getElementById('kwhTotal').value = kwhTotal;

            // Cria um objeto com os dados do apartamento
            const apartamento = {
                numeroap,
                bloco,
                numerorel,
                kwhinicial,
                kwhatual,
                kwhTotal,
                valorKwh,
                valorTotal
            };

            // Envia os dados para o servidor
            fetch('http://localhost:5500/apartamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(apartamento)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Dados salvos no servidor:', data);
                // Redireciona para a página de listagem de apartamentos
                window.location.href = 'listagemApartamentos.html';
            })
            .catch(error => {
                console.error('Erro ao enviar dados para o servidor:', error);
            });
        });
    } else {
        console.error('Formulário não encontrado');
    }
}

// Chama a função para adicionar o evento de submissão ao carregar o DOM
document.addEventListener('DOMContentLoaded', salvarCadastro);








// Regra Inquilino

function validarCadastroInquilino() {
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
   // errorMessage.textContent = ''; // Limpa mensagens de erro anteriores
    //successMessage.textContent = ''; // Limpa mensagens de sucesso anteriores

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const numerorel = document.getElementById('numerorel').value.trim();
    const bloco = document.getElementById('bloco').value.trim();
    const kwhatual = parseFloat(document.getElementById('kwhatual').value);

    if (!nome || !cpf || !numerorel || !bloco || isNaN(kwhatual)) {
        errorMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
        return false;
    }

    // CPF simples validação (número com 11 dígitos)
    if (cpf.length !== 11) {
        errorMessage.textContent = 'CPF deve ter 11 dígitos.';
        return false;
    }

    return true;
}

function salvarInquilino() {
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    console.log('Tentando salvar inquilino...'); 

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const numerorel = document.getElementById('numerorel').value.trim();
    const bloco = document.getElementById('bloco').value.trim();
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
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar dados');
        }
        return response.json();
    })
    .then(data => {
        successMessage.textContent = 'Dados salvos com sucesso!';
        console.log('Dados salvos no servidor:', data);
        // Redireciona após salvar, se necessário
        window.location.href = 'listagemInquilinos.html';
    })
    .catch(error => {
        errorMessage.textContent = 'Erro ao salvar dados. Tente novamente.';
        console.error('Erro ao enviar dados para o servidor:', error);
    });
}

// Função principal que espera o DOM ser carregado para adicionar o eventListener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada!');

    const form = document.getElementById('formCadastroInquilino');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            console.log('Formulário enviado!');

            if (validarCadastroInquilino()) {
                salvarInquilino(); // Salva o inquilino se a validação passar
            } else {
                console.log('Validação falhou!');
            }
        });
    } else {
        console.error('Formulário não encontrado');
    }
});

