document.addEventListener('DOMContentLoaded', function () {
    // 1. Tenta recuperar o usuário
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    // 2. ELEMENTOS DA INTERFACE (Protegidos com IF)
    const displayUserName = document.getElementById('display-user-name');
    const firstNameDisp = document.getElementById('first-name');
    const dropFullName = document.getElementById('drop-full-name');
    const dropEmail = document.getElementById('drop-email');
    const userInitials = document.getElementById('user-initials');
    const avatarImg = document.getElementById('user-avatar-img');
    // LÓGICA DE PESQUISA DO MENU
    const searchInput = document.getElementById('menuSearch');
    const clearSearch = document.getElementById('clearSearch');
    const menuItems = document.querySelectorAll('.nav-link-clone');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const term = this.value.toLowerCase();

            // Mostrar/Esconder o botão de limpar (X)
            clearSearch.style.display = term.length > 0 ? 'block' : 'none';

            menuItems.forEach(item => {
                const text = item.querySelector('.menu-text').innerText.toLowerCase();
                // Se o termo estiver no texto, mostra. Se não, esconde.
                if (text.includes(term)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Função do botão de limpar
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            clearSearch.style.display = 'none';
            menuItems.forEach(item => item.style.display = 'flex');
            searchInput.focus();
        });
    }

    // Só preenche se o usuário existir e se os elementos estiverem na página atual
    if (usuario) {
        if (displayUserName) displayUserName.innerText = usuario.nome;
        if (dropFullName) dropFullName.innerText = usuario.nome;

        if (firstNameDisp) {
            firstNameDisp.innerText = usuario.nome.split(' ')[0];
        }

        if (dropEmail) {
            dropEmail.innerText = `${usuario.ra}@souunisales.com.br`;
        }

        if (userInitials) {
            const nomes = usuario.nome.split(' ');
            const iniciais = (nomes[0][0] + (nomes.length > 1 ? nomes[nomes.length - 1][0] : '')).toUpperCase();
            userInitials.innerText = iniciais;
        }

        if (avatarImg) {
            // Se o objeto usuario tiver um campo 'foto', usa ele. 
            // Caso contrário, mantém o que já está no HTML (foto.jpg)
            if (usuario.foto) {
                avatarImg.src = usuario.foto;
            } else {
                // Opcional: Se quiser usar as iniciais apenas se não houver foto NENHUMA
                // avatarImg.src = `https://ui-avatars.com/api/?name=...`;
            }
        }
    }

    // 3. CONTROLE DO MENU LATERAL (Só funciona se o botão existir)
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    if (menuBtn && sidebar && mainContent) {
        menuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }

    // 4. DROPDOWN PERFIL
    const profileTrigger = document.getElementById('profileTrigger');
    const userDropdown = document.getElementById('userDropdown');

    if (profileTrigger && userDropdown) {
        profileTrigger.addEventListener('click', function (e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => userDropdown.classList.remove('show'));
    }

    // 5. LOGOUT
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'index.html';
        });
    }
});