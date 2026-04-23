document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CARREGAR DADOS DA SESSÃO ---
    const usuarioJSON = localStorage.getItem('usuarioLogado');

    if (!usuarioJSON) {
        window.location.href = 'index.html';
        return;
    }

    const usuario = JSON.parse(usuarioJSON);

    // --- 2. PREENCHIMENTO DO HEADER E UI ---
    const userGreeting = document.getElementById('user-greeting');
    const dropFullName = document.getElementById('drop-full-name');
    const profileTrigger = document.getElementById('profileTrigger');

    if (userGreeting) userGreeting.innerText = `Olá, ${usuario.nome}`;
    if (dropFullName) dropFullName.innerText = usuario.nome;

    // Lógica de Foto vs Iniciais no Header
    if (profileTrigger) {
        if (usuario.foto && usuario.foto.startsWith('data:image')) {
            profileTrigger.innerHTML = `<img src="${usuario.foto}" class="user-avatar" alt="Perfil">`;
        } else {
            const iniciais = usuario.nome.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            profileTrigger.innerHTML = `<div class="avatar-initials">${iniciais}</div>`;
        }
    }

    // --- 3. PREENCHIMENTO DOS CAMPOS DE EDIÇÃO (PERFIL.HTML) ---
    const nomeInput = document.getElementById('edit-nome');
    const emailInput = document.getElementById('edit-email');
    const displayNomeCompleto = document.getElementById('display-nome-completo');
    const previewFoto = document.getElementById('preview-foto');

    if (nomeInput) nomeInput.value = usuario.nome;
    if (displayNomeCompleto) displayNomeCompleto.innerText = usuario.nome;
    if (emailInput && usuario.email) emailInput.value = usuario.email;
    if (previewFoto && usuario.foto) previewFoto.src = usuario.foto;

    // --- 4. LÓGICA DA SIDEBAR E DROPDOWN ---
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const userDropdown = document.getElementById('userDropdown');

    if (menuBtn && sidebar && mainContent) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }

    if (profileTrigger && userDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        document.addEventListener('click', () => userDropdown.classList.remove('show'));
    }

    // --- 5. LÓGICA DE EDIÇÃO DE PERFIL (UPLOAD E SALVAR) ---
    const inputFoto = document.getElementById('input-foto');
    if (inputFoto) {
        inputFoto.addEventListener('change', function () {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewFoto) previewFoto.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        });
    }

    const btnSalvar = document.getElementById('btn-salvar-contato');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            usuario.foto = previewFoto ? previewFoto.src : usuario.foto;
            usuario.email = emailInput ? emailInput.value : usuario.email;

            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert('Perfil atualizado com sucesso!');
            location.reload(); // Recarrega para atualizar o avatar no header também
        });
    }

    // --- 6. LOGOUT ---
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'index.html';
        });
    }

    // --- 7. SCROLLSPY (Se as seções existirem) ---
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-item');

    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = "";
            sections.forEach(section => {
                if (pageYOffset >= (section.offsetTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) link.classList.add('active');
            });
        });
    }
});
