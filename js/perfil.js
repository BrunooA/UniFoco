document.addEventListener('DOMContentLoaded', () => {
    // 1. CARREGAR DADOS DO USUÁRIO
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
    if (usuario.nome) {
        document.getElementById('edit-nome').value = usuario.nome;
        document.getElementById('display-nome-completo').innerText = usuario.nome;
    }
    if (usuario.foto) document.getElementById('preview-foto').src = usuario.foto;

    const emailInput = document.getElementById('edit-email');

    if (usuario.email && emailInput) {
        emailInput.value = usuario.email;
    }

    // 2. LÓGICA DE SCROLLSPY (Destacar menu ao rolar)
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Se o scroll passou do topo da seção (com um ajuste de 150px)
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. PREVIEW E SALVAR FOTO
    const inputFoto = document.getElementById('input-foto');
    inputFoto.addEventListener('change', function () {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('preview-foto').src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    });

    document.getElementById('btn-salvar-contato').addEventListener('click', () => {
    // Pega os dados atuais do localStorage para não perder o RA
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');

    // Atualiza apenas o que foi mexido
    usuario.foto = document.getElementById('preview-foto').src;
    usuario.email = document.getElementById('edit-email').value;
    
    // Se você permitiu editar o nome, descomente a linha abaixo:
    // usuario.nome = document.getElementById('edit-nome').value;

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    
    alert('Perfil atualizado com sucesso!');
    
    // Opcional: Forçar o carregamento do nome na tela de perfil na hora
    document.getElementById('display-nome-completo').innerText = usuario.nome;
});
});
