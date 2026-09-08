document.addEventListener("DOMContentLoaded", () => {
    const audioBtn = document.getElementById("toggle-audio-btn");
    const bgAudio = document.getElementById("bg-audio");
    const searchInput = document.getElementById("search-input");
    const app = document.getElementById("app");

    // Salva o estado inicial dos cards
    const homeContent = app.innerHTML;

    // 1. Alternar Áudio
    function alternarAudio() {
        if (!bgAudio) return;

        if (bgAudio.paused) {
            bgAudio.play()
                .then(() => {
                    if (audioBtn) audioBtn.textContent = "🔇 Pausar Música";
                })
                .catch((err) => console.error("Erro de áudio:", err));
        } else {
            bgAudio.pause();
            if (audioBtn) audioBtn.textContent = "🔊 Ouvir Música";
        }
    }

    // 2. Filtro de busca dos cards
    function inicializarFiltro() {
        const input = document.getElementById("search-input");
        if (!input) return;

        input.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll(".card");

            cards.forEach((card) => {
                const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
                const description = card.querySelector("p")?.textContent.toLowerCase() || "";

                if (title.includes(term) || description.includes(term)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 3. Animação de Scroll
    function inicializarAnimacoes() {
        const cards = document.querySelectorAll(".card");
        if (!cards.length) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("card-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        cards.forEach((card) => {
            card.classList.add("card-hidden");
            observer.observe(card);
        });
    }

    // 4. Carregar páginas sem recarregar o navegador
    async function carregarPagina(url, pushState = true) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro ao carregar");

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Se voltar para a galeria
            if (url.endsWith("index.html") || url.endsWith("/")) {
                app.innerHTML = homeContent;
                if (searchInput) searchInput.parentElement.style.display = "flex";
                inicializarFiltro();
                inicializarAnimacoes();
            } else {
                // Se for a página individual de um santo (pega o .container do HTML do santo)
                const novoConteudo = doc.querySelector(".container") || doc.body;
                app.innerHTML = novoConteudo.innerHTML;
                if (searchInput) searchInput.parentElement.style.display = "none";
            }

            if (pushState) {
                history.pushState({ url }, "", url);
            }

            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Redirecionando via navegador por erro no fetch:", error);
            window.location.href = url;
        }
    }

    // Intercepta os cliques nos links para trocar apenas o conteúdo
    document.body.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (href && (href.endsWith(".html") || href.includes("index.html"))) {
            e.preventDefault();
            carregarPagina(link.href);
        }
    });

    // Suporte aos botões 'Voltar' e 'Avançar' do navegador
    window.addEventListener("popstate", (e) => {
        if (e.state && e.state.url) {
            carregarPagina(e.state.url, false);
        } else {
            carregarPagina(window.location.pathname, false);
        }
    });

    if (audioBtn) audioBtn.addEventListener("click", alternarAudio);
    inicializarFiltro();
    inicializarAnimacoes();
});