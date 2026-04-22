// 1. O Banco de Dados (Mantido)
const bancoAlunos = [
    { nome: "Adryel Costa",      ra: "6924206950", senha: "unisales" },
    { nome: "Alex Victor",       ra: "6924206951", senha: "unisales" },
    { nome: "Amanda Cezario",    ra: "6924206952", senha: "unisales" },
    { nome: "Amanda Rosário",    ra: "6924206953", senha: "unisales" },
    { nome: "Anderson Souza",    ra: "6924206954", senha: "unisales" },
    { nome: "Arthur",            ra: "6924206955", senha: "unisales" },
    { nome: "Breno",             ra: "6924206956", senha: "unisales" },
    { nome: "Bruno Araujo",      ra: "6924206957", senha: "unisales" },
    { nome: "Daniel",            ra: "6924206958", senha: "unisales" },
    { nome: "Felipe",            ra: "6924206959", senha: "unisales" },
    { nome: "Ismailer Gregório", ra: "6924206960", senha: "unisales" },
    { nome: "Jaime Júnior",      ra: "6924206961", senha: "unisales" },
    { nome: "João Casotte",      ra: "6924206962", senha: "unisales" },
    { nome: "Kaike Stofel",      ra: "6924206963", senha: "unisales" },
    { nome: "Kauã",              ra: "6924206964", senha: "unisales" },
    { nome: "Kauã Silva",        ra: "6924206965", senha: "unisales" },
    { nome: "Loys Lane",         ra: "6924206966", senha: "unisales" },
    { nome: "Phablo Escobar",    ra: "6924206967", senha: "unisales" },
    { nome: "Rafaella Costa",    ra: "6924206973", senha: "unisales" },
    { nome: "Raissa Rodrigues",  ra: "6924206969", senha: "unisales" },
    { nome: "Rodrigo",           ra: "6924206970", senha: "unisales" },
    { nome: "Samuel Clemente",   ra: "6924206971", senha: "unisales" },
    { nome: "Thiago Xavier",     ra: "6924206972", senha: "unisales" }
];

// 2. Lógica de LOGIN (O que deve rodar no index.html)
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const raInput = document.getElementById('ra').value;
            const senhaInput = document.getElementById('senha').value;

            // Busca o aluno
            const alunoEncontrado = bancoAlunos.find(aluno => aluno.ra === raInput && aluno.senha === senhaInput);

            if (alunoEncontrado) {
                // Salva quem logou e vai para o portal
                localStorage.setItem('usuarioLogado', JSON.stringify(alunoEncontrado));
                window.location.href = 'portal.html';
            } else {
                alert("RA ou senha incorretos!");
            }
        });
    }
});