document.getElementById('recuperarSenhaForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário

    const email = document.getElementById('email').value;

    if (email) {
        // Simulação de envio de e-mail
        console.log(`Enviando e-mail de recuperação para: ${email}`);

        // Exibe uma mensagem de sucesso
        mostrarPopup("Email enviado com sucesso!");
    } else {
        mostrarPopup("Por favor, insira um e-mail válido.");
    }
});

function mostrarPopup(mensagem) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = mensagem;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function voltar() {
    window.history.back(); // Retorna à página anterior
}
