// Função para mostrar o chatbot quando o botão for clicado
document.getElementById('start-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'block';
});

function showResponse(question) {
    const response = getResponse(question);

    const chatbotContent = document.getElementById('chatbot-content');
    const typingIndicator = document.querySelector('.typing-indicator');

    // Simula um atraso para simular o "digitando"
    typingIndicator.style.display = 'inline';
    setTimeout(() => {
        typingIndicator.style.display = 'none';

        const newMessage = document.createElement('div');
        newMessage.className = 'chatbot-message';
        newMessage.innerHTML = `
            <div class="chatbot-message">
                <span class="chatbot-name">Andrew</span>
                <div class="chatbot-message-text">${response}</div>
            </div>
        `;
        chatbotContent.appendChild(newMessage);
        chatbotContent.scrollTop = chatbotContent.scrollHeight;
    }, 1000); // 1 segundo de atraso para simular "digitando"
}

function getResponse(question) {
    let response = '';
    if (question === 'Como utilizar o site?') {
        response = 'Para utilizar o site primeiramente você inicia o seu teste interativo para saber o quão viciado você está em cassino a partir disso o próprio site te mostrará o que deve ser feito.';
    } else if (question === 'Como olhar os resultados?') {
        response = 'Basta acessar o perfil no canto superior direito para que, depois que você já tenha feito o teste você verifique seus resultados na aba.';
    } else if (question === 'Como Modifico meu perfil?') {
        response = 'Para modificar seu perfil basta entrar no perfil no canto superior direito e clicar em atualizar informações, com isso você atualiza de acordo com os dados que forem pedidos e clique em salvar alterações.';
    }
    return response;
}
