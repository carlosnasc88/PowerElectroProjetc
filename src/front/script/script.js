

//-------Cadastro Casa-------//
// function validarCadastroCasa() {
//     const errorMessage = document.getElementById('error-message');
//     errorMessage.textContent = ''; // Limpa mensagens de erro anteriores

//     const numeroap = document.getElementById('numeroap').value;
//     const bloco = document.getElementById('bloco').value;
//     const numerorel = document.getElementById('numerorel').value;
//     const kwhinicial = parseFloat(document.getElementById('kwhinicial').value);
//     const kwhatual = parseFloat(document.getElementById('kwhatual').value);
//     const valorKwh = parseFloat(document.getElementById('valorKwh').value);

//     if (!numeroap || !bloco || !numerorel || isNaN(kwhinicial) || isNaN(kwhatual) || isNaN(valorKwh)) {
//         errorMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
//         return false;
//     }

//     if (kwhatual < kwhinicial) {
//         errorMessage.textContent = 'O Kwh Atual não pode ser menor que o Kwh Inicial.';
//         return false;
//     }

//     return true;
// }

// function salvarCadastro() {
//     console.log('DOM completamente carregado e analisado');

//     const form = document.getElementById('formCadastroCasa');
//     if (form) {
//         console.log('Formulário encontrado');
        
//         form.addEventListener('submit', function(event) {
//             event.preventDefault(); // Previne o envio padrão do formulário

//             if (!validarCadastroCasa()) {
//                 return; // Se a validação falhar, não envie os dados
//             }

//             // Obtém os valores dos campos do formulário
//             const numeroap = document.getElementById('numeroap').value;
//             const bloco = document.getElementById('bloco').value;
//             const numerorel = document.getElementById('numerorel').value;
//             const kwhinicial = parseFloat(document.getElementById('kwhinicial').value) || 0; 
//             const kwhatual = parseFloat(document.getElementById('kwhatual').value) || 0; 
//             const valorKwh = parseFloat(document.getElementById('valorKwh').value) || 0; 
//             const kwhTotal = kwhatual - kwhinicial; 
//             const valorTotal = kwhTotal * valorKwh; 

//             // Atualiza o campo oculto com o valor calculado
//             document.getElementById('kwhTotal').value = kwhTotal;

//             // Cria um objeto com os dados do apartamento
//             const apartamento = {
//                 numeroap,
//                 bloco,
//                 numerorel,
//                 kwhinicial,
//                 kwhatual,
//                 kwhTotal,
//                 valorKwh,
//                 valorTotal
//             };

//             // Envia os dados para o servidor
//             fetch('http://localhost:5500/apartamentos', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(apartamento)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Dados salvos no servidor:', data);
//                 // Redireciona para a página de listagem de apartamentos
//                 window.location.href = 'listagemApartamentos.html';
//             })
//             .catch(error => {
//                 console.error('Erro ao enviar dados para o servidor:', error);
//             });
//         });
//     } else {
//         console.error('Formulário não encontrado');
//     }
// }
// // Chama a função para adicionar o evento de submissão ao carregar o DOM
// document.addEventListener('DOMContentLoaded', salvarCadastro);













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
