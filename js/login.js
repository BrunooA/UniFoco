// 1. O Banco de Dados (Simulado)
const bancoAlunosRaw = [
    { nome: "Adryel Costa", ra: "6924206950", senha: "unisales" },
    { nome: "Alex Victor", ra: "6924206951", senha: "unisales" },
    { nome: "Amanda Cezario", ra: "6924206952", senha: "unisales" },
    { nome: "Amanda Rosário", ra: "6924206953", senha: "unisales" },
    { nome: "Anderson Souza", ra: "6924206954", senha: "unisales" },
    { nome: "Arthur", ra: "6924206955", senha: "unisales" },
    { nome: "Breno", ra: "6924206956", senha: "unisales" },
    { nome: "Bruno Araujo Silva", ra: "6924206973", senha: "unisales" }, // Exemplo com 3 nomes
    { nome: "Ismailer Gregório", ra: "6924206960", senha: "unisales" },
    { nome: "Jaime Júnior", ra: "6924206961", senha: "unisales" },
    { nome: "João Casotte", ra: "6924206962", senha: "unisales" },
    { nome: "Kaike Stofel", ra: "6924206963", senha: "unisales" },
    { nome: "Kauã Silva", ra: "6924206965", senha: "unisales" },
    { nome: "Phablo Escobar", ra: "6924206967", senha: "unisales" },
    { nome: "Rafaella Costa", ra: "6924206957", senha: "unisales" }
];

// 2. Geração Dinâmica de E-mails
const bancoAlunos = bancoAlunosRaw.map(aluno => {
    const partes = aluno.nome.toLowerCase().trim().split(/\s+/);
    let emailGerado = "";

    if (partes.length > 1) {
        const ultimoSobrenome = partes.pop(); 
        const restoDoNome = partes.join(''); 
        emailGerado = `${restoDoNome}.${ultimoSobrenome}@souunisales.com.br`;
    } else {
        emailGerado = `${partes[0]}@souunisales.com.br`;
    }

    return { ...aluno, email: emailGerado };
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const raInput = document.getElementById('ra');
    const senhaInput = document.getElementById('senha');
    const fieldRa = document.getElementById('field-ra');
    const fieldSenha = document.getElementById('field-senha');

    // --- 1. Mostrar/Esconder Senha ---
    const toggleBtn = document.getElementById('togglePassword');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isPass = senhaInput.type === 'password';
            senhaInput.type = isPass ? 'text' : 'password';
            toggleBtn.setAttribute('icon', isPass ? 'ri:eye-off-line' : 'ri:eye-line');
        });
    }

    // --- 2. Botões de Limpar (X) ---
    document.getElementById('clear-ra').addEventListener('click', () => {
        raInput.value = '';
        fieldRa.classList.remove('error');
        raInput.focus();
    });

    document.getElementById('clear-senha').addEventListener('click', () => {
        senhaInput.value = '';
        fieldSenha.classList.remove('error');
        senhaInput.focus();
    });

    // Limpar erro enquanto o usuário digita
    raInput.addEventListener('input', () => fieldRa.classList.remove('error'));
    senhaInput.addEventListener('input', () => fieldSenha.classList.remove('error'));

    // --- 3. Validação e Autenticação ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const raVal = raInput.value.trim();
        const senhaVal = senhaInput.value.trim();
        let temErro = false;

        // Valida campo RA
        if (!raVal) {
            fieldRa.classList.add('error');
            temErro = true;
        }

        // Valida campo Senha
        if (!senhaVal) {
            fieldSenha.classList.add('error');
            temErro = true;
        }

        if (temErro) return;

        // Simulação de busca no "banco"
        const aluno = bancoAlunos.find(a => a.ra === raVal && a.senha === senhaVal);

        if (aluno) {
            // Salva apenas o nome e RA por segurança, não a senha

            const sessaoUsuario = {
                nome: aluno.nome,
                ra: aluno.ra,
                email: aluno.email, // Salva o e-mail gerado aqui
                logadoEm: new Date().toISOString()
            };
            localStorage.setItem('usuarioLogado', JSON.stringify(sessaoUsuario));

            // Redireciona para o portal
            window.location.href = 'portal.html';
        } else {
            // Destaca campos e avisa erro
            fieldRa.classList.add('error');
            fieldSenha.classList.add('error');
            alert("RA ou senha incorretos. Verifique os dados e tente novamente.");
        }
    });
});
