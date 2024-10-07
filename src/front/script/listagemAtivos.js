// Função para buscar apartamentos ativos
document.addEventListener('DOMContentLoaded', () => {
    // Chama a função para buscar os dados do banco de dados
    fetchDados();
});

function fetchDados() {
    fetch('http://localhost:5500/apartamentos') // Ajuste a URL conforme necessário
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados: ' + response.statusText);
            }
            return response.json(); // Supondo que a resposta seja em JSON
        })
        .then(data => {
            // Chama a função para preencher a tabela com os dados recebidos
            preencherTabela(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function preencherTabela(dados) {
    const tabelaInquilinos = document.getElementById('tabelaInquilinos');
    tabelaInquilinos.innerHTML = ''; // Limpa a tabela antes de preencher

    // Loop pelos dados e cria linhas da tabela
    dados.forEach(apartamento => {
        const linha = document.createElement('tr');
        linha.setAttribute('data-cpf', apartamento.cpf); // Ajuste conforme sua estrutura de dados

        linha.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${apartamento.numero}</td>
            <td>${apartamento.bloco}</td>
            <td>${apartamento.numRelogio}</td>
            <td>${apartamento.kwhInicial}</td>
            <td>${apartamento.kwhAtual}</td>
            <td>${apartamento.inquilino}</td>
            <td>${apartamento.cpf}</td>
            <td>${apartamento.status}</td>
        `;

        tabelaInquilinos.appendChild(linha);
    });
}








function buscarApartamentos() {
    fetch('http://localhost:5500/apartamentos?ativo=true') // URL para obter os apartamentos ativos
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar apartamentos');
            }
            return response.json();
        })
        .then(apartamentos => {
            const tabelaInquilinos = document.getElementById('tabelaInquilinos');
            tabelaInquilinos.innerHTML = ''; // Limpa a tabela antes de preenchê-la

            apartamentos.forEach(apartamento => {
                const linha = document.createElement('tr');
                linha.setAttribute('data-cpf', apartamento.cpf_inquilino); // Assume que o campo é cpf_inquilino

                linha.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${apartamento.numeroap}</td>
                    <td>${apartamento.bloco}</td>
                    <td>${apartamento.numerorel}</td>
                    <td>${apartamento.kwhinicial}</td>
                    <td>${apartamento.kwhatual}</td>
                    <td>${apartamento.nome_inquilino}</td>
                    <td>${apartamento.cpf_inquilino}</td>
                    <td>${apartamento.ativo ? 'Ativo' : 'Inativo'}</td>
                `;
                
                tabelaInquilinos.appendChild(linha);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar apartamentos:', error);
        });
}

function deletarSelecionados() {
    const checkboxes = document.querySelectorAll('#tabelaAtivos input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
        alert("Selecione pelo menos um inquilino para deletar.");
        return;
    }

    checkboxes.forEach(checkbox => {
        const linha = checkbox.closest('tr');
        const cpf = linha.getAttribute('data-cpf');
        console.log(`Tentando deletar o inquilino com CPF: ${cpf}`); // Verificação do CPF

        // Validação do CPF
        if (cpf && !isNaN(cpf)) {
            fetch(`http://localhost:5500/inquilinos/${cpf}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    linha.remove();
                    console.log(`Inquilino com CPF ${cpf} deletado com sucesso.`);
                } else {
                    console.error(`Erro ao deletar inquilino com CPF ${cpf}.`);
                }
            })
            .catch(error => {
                console.error(`Erro na requisição para deletar o inquilino com CPF ${cpf}:`, error);
            });
        } else {
            console.error(`CPF inválido: ${cpf}`); // Mensagem de erro se o CPF for inválido
        }
    });
}


// Chama a função ao carregar a página
window.onload = buscarApartamentos;
