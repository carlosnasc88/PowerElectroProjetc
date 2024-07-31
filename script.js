// script.js

// Função para salvar dados do formulário de cadastro
function salvarCadastro() {
    console.log('DOM completamente carregado e analisado');

    const form = document.getElementById('formCadastroCasa');
    if (form) {
        console.log('Formulário encontrado');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário
            console.log('Formulário submetido');

            // Obtém os valores dos campos do formulário
            const numeroap = document.getElementById('numeroap').value;
            const bloco = document.getElementById('bloco').value;
            const numerorel = document.getElementById('numerorel').value;
            const kwhinicial = parseFloat(document.getElementById('kwhinicial').value) || 0; // Converte para número ou 0
            const kwhatual = parseFloat(document.getElementById('kwhatual').value) || 0; // Converte para número ou 0
            const kwhTotal = kwhatual - kwhinicial; // Calcula o Kwh total

            console.log('Dados do formulário:', {
                numeroap,
                bloco,
                numerorel,
                kwhinicial,
                kwhatual,
                kwhTotal
            });

            // Cria um objeto com os dados
            const apartamento = {
                numeroap,
                bloco,
                numerorel,
                kwhinicial,
                kwhatual,
                kwhTotal
            };

            // Obtém os apartamentos do LocalStorage, ou inicializa um array vazio se não houver dados
            let apartamentos = JSON.parse(localStorage.getItem('apartamentos')) || [];
            
            // Adiciona o novo apartamento ao array
            apartamentos.push(apartamento);

            // Salva o array atualizado no LocalStorage
            localStorage.setItem('apartamentos', JSON.stringify(apartamentos));

            console.log('Dados salvos no LocalStorage');

            // Redireciona para a página de consulta
            window.location.href = 'consutadaCasCadastrada.html';
        });
    } else {
        console.error('Formulário não encontrado');
    }
}

// Função para carregar dados na página de consulta
function carregarDados() {
    console.log('Página de consulta carregada');
    
    // Obtém os dados do LocalStorage
    const apartamentos = JSON.parse(localStorage.getItem('apartamentos')) || [];
    console.log('Dados carregados do LocalStorage:', apartamentos);

    // Seleciona o corpo da tabela
    const tbody = document.querySelector('#tabelaApartamentos tbody');
    
    // Adiciona os dados na tabela
    apartamentos.forEach(apartamento => {
        const kwhinicial = parseFloat(apartamento.kwhinicial) || 0;
        const kwhatual = parseFloat(apartamento.kwhatual) || 0;
        const kwhTotal = parseFloat(apartamento.kwhTotal) || 0;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${apartamento.numeroap}</td>
            <td>${apartamento.bloco}</td>
            <td>${apartamento.numerorel}</td>
            <td>${kwhinicial.toFixed(2)}</td>
            <td>${kwhatual.toFixed(2)}</td>
            <td>${kwhTotal.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Verifica qual página está sendo carregada para chamar a função correta
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('formCadastroCasa')) {
        salvarCadastro();
    } else if (document.querySelector('#tabelaApartamentos')) {
        carregarDados();
    }
});

