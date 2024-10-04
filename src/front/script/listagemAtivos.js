// Função para carregar os apartamentos ativos
function carregarApartamentosAtivos() {
    fetch('/apartamentos?ativo=true') // Chama a rota do backend para obter apartamentos ativos
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar apartamentos ativos');
            }
            return response.json();
        })
        .then(data => {
            const tabela = document.querySelector('#tabelaAtivos tbody');
            tabela.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
            data.forEach(apartamento => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><input type="checkbox" class="select-apartamento" value="${apartamento.numeroap}"></td>
                    <td>${apartamento.numeroap}</td>
                    <td>${apartamento.bloco}</td>
                    <td>${apartamento.numerorel}</td>
                    <td>${apartamento.kwhinicial}</td>
                    <td>${apartamento.kwhatual}</td>
                    <td>${apartamento.ativo ? 'Ativo' : 'Inativo'}</td>
                `;
                tabela.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar apartamentos ativos:', error);
            alert(error.message);
        });
}

// Função para deletar apartamentos selecionados
function deletarSelecionados() {
    const checkboxes = document.querySelectorAll('.select-apartamento:checked');
    if (checkboxes.length === 0) {
        alert('Selecione pelo menos um apartamento para deletar.');
        return;
    }

    const numerosap = Array.from(checkboxes).map(checkbox => checkbox.value);
    if (confirm(`Tem certeza que deseja deletar os apartamentos: ${numerosap.join(', ')}?`)) {
        Promise.all(numerosap.map(numeroap => 
            fetch(`/apartamentos/${numeroap}`, { method: 'DELETE' })
        ))
        .then(responses => {
            responses.forEach(response => {
                if (!response.ok) {
                    throw new Error('Erro ao deletar apartamentos');
                }
            });
            alert('Apartamentos deletados com sucesso!');
            carregarApartamentosAtivos(); // Recarrega a tabela após deletar
        })
        .catch(error => {
            alert(error.message);
        });
    }
}

// Função para editar apartamentos selecionados
function editarSelecionados() {
    const checkboxes = document.querySelectorAll('.select-apartamento:checked');
    if (checkboxes.length === 0) {
        alert('Selecione pelo menos um apartamento para editar.');
        return;
    }
    
    // Redireciona para a página de edição do primeiro apartamento selecionado
    const numeroap = checkboxes[0].value;
    window.location.href = `/src/front/pages/cadastro/editarApartamento.html?numeroap=${numeroap}`;
}

// Carrega os apartamentos ao abrir a página
window.onload = carregarApartamentosAtivos;
