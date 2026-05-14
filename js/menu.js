document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const profileTrigger = document.getElementById('profileTrigger');
    const userDropdown = document.getElementById('userDropdown');

    // 1. Abrir/Fechar Sidebar
    if (menuBtn && sidebar && mainContent) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }

    // 2. Dropdown do Perfil
    if (profileTrigger && userDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            userDropdown.classList.remove('show');
        });
    }
    
    // 3. Preencher nome do usuário no menu (vindo do seu login.js)
    const dados = JSON.parse(localStorage.getItem('usuarioLogado'));
    const dropNome = document.getElementById('drop-full-name');
    if (dados && dropNome) {
        dropNome.innerText = dados.nome;
    }
});
