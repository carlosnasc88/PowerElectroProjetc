document.addEventListener('DOMContentLoaded', () => {
    buscarApartamentos();
});

async function buscarApartamentos() {
    try {
        const token = localStorage.getItem('userToken');  // Assume que o token foi salvo após o login
        if (!token) {
            alert('Usuário não autenticado');
            window.location.href = '/login.html';  // Redireciona para o login se não autenticado
            return;
        }

        // Requisição para buscar apartamentos do usuário logado
        const response = await fetch('http://localhost:5500/apartamentos/usuario-logado', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Envia o token no cabeçalho da requisição
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar apartamentos');
        }

        const apartamentos = await response.json();
        const tabelaInquilinos = document.getElementById('tabelaInquilinos');
        tabelaInquilinos.innerHTML = ''; // Limpa a tabela antes de preenchê-la

        apartamentos.forEach(apartamento => {
            const linha = document.createElement('tr');
            linha.setAttribute('data-id', apartamento.id); // Captura o ID do apartamento

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
    } catch (error) {
        console.error('Erro ao buscar apartamentos:', error);
        alert('Erro ao carregar os dados dos apartamentos.');
    }
}

function deletarSelecionados() {
    const checkboxes = document.querySelectorAll('#tabelaInquilinos input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
        alert("Selecione pelo menos um apartamento para deletar.");
        return;
    }

    // Pergunta de confirmação
    if (!confirm("Tem certeza que deseja excluir?")) {
        return; // Cancela a operação se o usuário clicar em "Cancelar"
    }

    const idsParaDeletar = [];

    checkboxes.forEach(checkbox => {
        const linha = checkbox.closest('tr');
        const id = linha.getAttribute('data-id'); // Captura o ID do apartamento
        idsParaDeletar.push(id); // Adiciona o ID à lista
    });

    // Executa a exclusão
    Promise.all(idsParaDeletar.map(id => {
        return fetch(`http://localhost:5500/apartamentos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`  // Autenticação
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao deletar apartamento com ID ${id}.`);
            }
            return id; // Retorna o ID para o próximo then
        });
    }))
    .then(deletedIds => {
        deletedIds.forEach(id => {
            const linha = document.querySelector(`tr[data-id="${id}"]`);
            if (linha) linha.remove(); // Remove a linha da tabela
        });
        mostrarPopup("Apartamento deletado com sucesso!");
    })
    .catch(error => {
        console.error(error);
        alert('Ocorreu um erro ao tentar deletar os apartamentos.');
    });
}

function mostrarPopup(mensagem) {
    // Cria o elemento popup
    const popup = document.createElement('div');
    popup.classList.add('popup-message');
    popup.innerText = mensagem;

    document.body.appendChild(popup);

    // Remove o popup após 3 segundos
    setTimeout(() => {
        popup.remove();
    }, 3000);
}
