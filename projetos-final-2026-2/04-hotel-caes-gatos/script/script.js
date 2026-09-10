// Função para enviar o formulário de reserva
function enviarReserva(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeTutor').value;
    const especie = document.getElementById('especiePet').value;
    
    alert(`Obrigado, ${nome}! Sua pré-reserva para o seu ${especie.toLowerCase()} foi enviada com sucesso. Nossa equipe entrará em contato via WhatsApp.`);
    document.getElementById('reservaForm').reset();
}

// Funções do Modal de Login
function abrirLogin() {
    document.getElementById('modalLogin').classList.add('active');
}

function fecharLogin() {
    document.getElementById('modalLogin').classList.remove('active');
}

function realizarLogin(event) {
    event.preventDefault();
    alert('Login efetuado com sucesso! Bem-vindo de volta ao Refúgio das Patas.');
    fecharLogin();
}

// Fecha o modal ao clicar fora da caixa branca
window.onclick = function(event) {
    const modal = document.getElementById('modalLogin');
    if (event.target === modal) {
        fecharLogin();
    }
}