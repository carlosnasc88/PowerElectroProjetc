let tarefas = []; // Armazena as tarefas em memória

// Lista todas as tarefas
const listarTarefas = (req, res) => {
    res.json(tarefas);
};

// Cria uma nova tarefa
const criarTarefa = (req, res) => {
    const { descricao } = req.body;
    
    if (!descricao) {
        return res.status(400).json({ mensagem: 'Descrição é obrigatória' });
    }

    const novaTarefa = { id: tarefas.length + 1, descricao };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
};

// Atualiza uma tarefa existente
const atualizarTarefa = (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;
    
    if (!descricao) {
        return res.status(400).json({ mensagem: 'Descrição é obrigatória' });
    }

    const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));
    if (index !== -1) {
        tarefas[index].descricao = descricao;
        res.json(tarefas[index]);
    } else {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
};

// Exclui uma tarefa
const excluirTarefa = (req, res) => {
    const { id } = req.params;
    const index = tarefas.findIndex(tarefa => tarefa.id === parseInt(id));
    
    if (index !== -1) {
        tarefas.splice(index, 1);
        res.json({ mensagem: 'Tarefa excluída com sucesso' });
    } else {
        res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
};

module.exports = { listarTarefas, criarTarefa, atualizarTarefa, excluirTarefa };
