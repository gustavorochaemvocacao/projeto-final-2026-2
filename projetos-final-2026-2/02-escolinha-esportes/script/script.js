/* =========================================================
   Escolinha de Futebol & Vôlei Craques
   Script Principal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Atualização Automática do Ano no Rodapé
  const elementoAno = document.getElementById('ano');
  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }

  // 2. Manipulação do Formulário de Contato / Pré-Matrícula
  const formContato = document.querySelector('.form-contato');
  if (formContato) {
    formContato.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const modalidade = document.getElementById('modalidade').value;

      alert(`Obrigado, ${nome}! Sua pré-matrícula para a modalidade (${modalidade}) foi enviada com sucesso. Entraremos em contato via WhatsApp!`);
      
      formContato.reset();
    });
  }

  // 3. Manipulação do Formulário de Feedback
  const formFeedback = document.querySelector('.form-feedback');
  if (formFeedback) {
    formFeedback.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = document.getElementById('nome-feedback').value;
      const avaliacao = document.getElementById('avaliacao').value;
      const gridFeedbacks = document.querySelector('.grid-feedbacks');

      // Cria um novo card de feedback dinamica na página
      if (gridFeedbacks) {
        const novoCard = document.createElement('article');
        novoCard.className = 'feedback-card';
        novoCard.innerHTML = `
          <p class="comentario">"${avaliacao}"</p>
          <p class="autor"><strong>— ${nome}</strong></p>
          <span class="estrelas">⭐⭐⭐⭐⭐</span>
        `;

        gridFeedbacks.appendChild(novoCard);
      }

      alert('Agradecemos pelo seu feedback!');
      formFeedback.reset();
    });
  }

  // 4. Mudar cor do cabeçalho ao rolar a página (Efeito Scroll)
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(21, 128, 61, 0.95)';
    } else {
      header.style.backgroundColor = 'var(--primary)';
    }
  });

});