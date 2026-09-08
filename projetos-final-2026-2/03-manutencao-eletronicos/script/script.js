// ========= Inicialização Principal =========
document.addEventListener('DOMContentLoaded', () => {
  // Preenche o ano automaticamente no footer
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu mobile (toggle)
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  // Inicializa os módulos da página
  initFormContato();
  initIaChat();
});

// ========= Validação do formulário de contato =========
function initFormContato() {
  const form = document.getElementById('formContato');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    const feedback = document.getElementById('feedback');
    if (!feedback) return;

    feedback.style.display = 'block';

    // Captura os valores dos campos
    const nome = form.querySelector('#nome')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const mensagem = form.querySelector('#mensagem')?.value.trim();

    // Validação básica do formato de e-mail
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');

    if (!nome || !emailOk || !mensagem) {
  feedback.classList.remove('erro'); // Limpa estados anteriores
  void feedback.offsetWidth;         // Força a atualização do DOM para reativar animações CSS
  feedback.classList.add('erro');
  feedback.textContent = 'Por favor, preencha todos os campos corretamente.';
  return;
}
  });
}

// ========= Módulo do Chatbot / IA Auxiliar =========
function initIaChat() {
  const toggleBtn = document.getElementById('iaChatToggle');
  const closeBtn = document.getElementById('iaChatClose');
  const chatBox = document.getElementById('iaChatBox');
  const chatMessages = document.getElementById('iaChatMessages');
  const chatInput = document.getElementById('iaChatInput');
  const sendBtn = document.getElementById('iaChatSend');
  const suggestions = document.querySelectorAll('.ia-chat-suggestions button');

  if (!toggleBtn || !chatBox) return;

  // Abrir e fechar a janela do chat
  toggleBtn.addEventListener('click', () => chatBox.classList.toggle('active'));
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => chatBox.classList.remove('active'));
  }

  // Base de respostas inteligentes
  function getIaResponse(text) {
    const query = text.toLowerCase();

    if (query.includes('preço') || query.includes('preco') || query.includes('orçamento') || query.includes('orcamento') || query.includes('cuanto') || query.includes('quanto custa')) {
      return "Nossos orçamentos são 100% gratuitos! Você pode nos enviar uma mensagem pelo WhatsApp informando o modelo do aparelho para um valor prévio.";
    } else if (query.includes('tempo') || query.includes('demora') || query.includes('prazo') || query.includes('mesmo dia')) {
      return "Trocas de tela e bateria geralmente são concluídas no mesmo dia! Reparos avançados em placa levam entre 24h e 48h.";
    } else if (query.includes('garantia') || query.includes('seguro')) {
      return "Oferecemos 90 dias de garantia completa para todos os serviços realizados e peças trocadas.";
    } else if (query.includes('endereço') || query.includes('endereco') || query.includes('onde fica') || query.includes('localização') || query.includes('localizacao')) {
      return "Ficamos na Av. Paulista, 1500 — Cj. 42 (Próximo à estação Trianon-Masp), São Paulo - SP.";
    } else if (query.includes('horario') || query.includes('horário') || query.includes('funciona')) {
      return "Atendemos de Segunda a Sexta das 08:30 às 18:30 e aos Sábados das 09:00 às 13:00.";
    } else if (query.includes('oi') || query.includes('olá') || query.includes('ola')) {
      return "Olá! Como posso ajudar você com seu dispositivo hoje?";
    } else {
      return "Para detalhes sobre esse reparo específico, recomendo conversar diretamente com nossa equipe no WhatsApp!";
    }
  }

  // Insere uma nova bolha de mensagem na tela
  function addMessage(sender, text) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `ia-message ${sender}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Manipula a ação de envio
  function handleSend(text) {
    const messageText = text || (chatInput ? chatInput.value.trim() : '');
    if (!messageText) return;

    addMessage('user', messageText);
    if (!text && chatInput) chatInput.value = '';

    // Simula resposta da IA com pequenos atrasos
    setTimeout(() => {
      const botAnswer = getIaResponse(messageText);
      addMessage('bot', botAnswer);
    }, 400);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', () => handleSend());
  }

  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  suggestions.forEach(button => {
    button.addEventListener('click', () => {
      const query = button.getAttribute('data-query');
      handleSend(query);
    });
  });
}