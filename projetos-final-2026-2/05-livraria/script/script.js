let carrinho = [];
        let desejos = ["Meditações para o Dia a Dia - Sto. Afonso"];
        let estanteComprados = ["Introdução à Vida Devota - S. Francisco de Sales"];

        function mudarAba(abaId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.sidebar button').forEach(el => el.classList.remove('active'));

            const aba = document.getElementById(`tab-${abaId}`);
            if (aba) aba.classList.add('active');

            const btn = document.getElementById(`btn-${abaId}`);
            if (btn) btn.classList.add('active');

            if (abaId === 'desejos') renderizarDesejos();
            if (abaId === 'estante') renderizarEstante();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function adicionarCarrinho(nomeLivro) {
            carrinho.push(nomeLivro);
            atualizarCarrinhoUI();
            alert(`"${nomeLivro}" foi adicionado ao carrinho!`);
        }

        function atualizarCarrinhoUI() {
            document.getElementById('cart-count').innerText = carrinho.length;
            const container = document.getElementById('cart-items-container');
            
            if (carrinho.length === 0) {
                container.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 20px;">Seu carrinho está vazio.</p>';
                document.getElementById('cart-total-price').innerText = 'R$ 0,00';
                return;
            }

            container.innerHTML = '';
            let total = 0;
            carrinho.forEach((item, index) => {
                total += 50;
                container.innerHTML += `
                    <div class="cart-item">
                        <span>${item}</span>
                        <button onclick="removerCarrinho(${index})" style="background:none; border:none; color: #ff5555; cursor:pointer;">Remover</button>
                    </div>
                `;
            });
            document.getElementById('cart-total-price').innerText = `R$ ${total},00`;
        }

        function removerCarrinho(index) {
            carrinho.splice(index, 1);
            atualizarCarrinhoUI();
        }

        function abrirCarrinho() {
            document.getElementById('cart-modal').classList.add('open');
        }

        function fecharCarrinho() {
            document.getElementById('cart-modal').classList.remove('open');
        }

        function adicionarDesejos(nomeLivro) {
            if (!desejos.includes(nomeLivro)) {
                desejos.push(nomeLivro);
                alert(`"${nomeLivro}" adicionado à Lista de Desejos!`);
            } else {
                alert('Este livro já está na sua lista de desejos.');
            }
        }

        function renderizarDesejos() {
            const grid = document.getElementById('desejos-grid');
            grid.innerHTML = '';
            if (desejos.length === 0) {
                grid.innerHTML = '<p style="color: var(--text-muted);">Nenhum livro na lista de desejos.</p>';
                return;
            }
            desejos.forEach(livro => {
                grid.innerHTML += `
                    <div class="book-card">
                        <div class="book-info">
                            <h4>${livro}</h4>
                            <p>Desejo salvo</p>
                        </div>
                        <div class="book-actions">
                            <button class="btn" onclick="adicionarCarrinho('${livro}')">Mover p/ Carrinho</button>
                        </div>
                    </div>
                `;
            });
        }

        function renderizarEstante() {
            const grid = document.getElementById('estante-grid');
            grid.innerHTML = '';
            if (estanteComprados.length === 0) {
                grid.innerHTML = '<p style="color: var(--text-muted);">Sua estante de leitura está vazia.</p>';
                return;
            }
            estanteComprados.forEach(livro => {
                grid.innerHTML += `
                    <div class="book-card">
                        <div class="book-info">
                            <h4>${livro}</h4>
                            <p style="color: #2ecc71;">Adquirido / Disponível para Leitura</p>
                        </div>
                        <div class="book-actions">
                            <button class="btn" onclick="alert('Abrindo leitor digital do livro...')">Ler Livro</button>
                        </div>
                    </div>
                `;
            });
        }

        function realizarBusca() {
            const termo = document.getElementById('global-search').value;
            if (termo.trim() !== '') {
                alert(`Buscando por: "${termo}"... Redirecionando para resultados.`);
                mudarAba('destaques');
            }
        }