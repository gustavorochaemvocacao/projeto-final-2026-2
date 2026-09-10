document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const chatbotBox = document.getElementById('chatbotBox');
    const sendBtn = document.getElementById('chatbotSend');
    const inputField = document.getElementById('chatbotInput');
    const chatBody = document.getElementById('chatbotBody');

    // Abrir/Fechar Chatbot
    toggleBtn.addEventListener('click', () => {
        chatbotBox.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', () => {
        chatbotBox.classList.add('hidden');
    });

    // Enviar mensagem
    function sendMessage() {
        const text = inputField.value.trim();
        if (text === '') return;

        // Adicionar mensagem do usuário
        const userMsg = document.createElement('div');
        userMsg.classList.add('user-msg');
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);

        inputField.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Resposta automática simulada do Bot
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.classList.add('bot-msg');
            
            const lowerText = text.toLowerCase();
            if (lowerText.includes('horário') || lowerText.includes('funcionamento')) {
                botMsg.textContent = 'Funcionamos de segunda a sexta das 08h às 18h, e aos sábados das 08h às 12h.';
            } else if (lowerText.includes('preço') || lowerText.includes('valor') || lowerText.includes('consulta')) {
                botMsg.textContent = 'Os valores variam conforme a avaliação clínica. Deseja agendar pelo WhatsApp?';
            } else {
                botMsg.textContent = 'Obrigado pelo contato! Para agendamentos rápidos ou dúvidas específicas, clique no botão flutuante do WhatsApp.';
            }

            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
    }

    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});