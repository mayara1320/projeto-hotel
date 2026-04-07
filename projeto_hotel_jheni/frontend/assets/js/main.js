//alert("JS carregou!");
// Essa linha mostra um alerta na tela dizendo que o JavaScript foi carregado.
// Está comentada (//) então não executa.
// Serve apenas para testar se o arquivo main.js está funcionando.
// Aqui estamos dizendo:
// "Espere o HTML carregar completamente antes de executar o JavaScript"
document.addEventListener("DOMContentLoaded", function () {
    // Aqui estamos pegando o formulário pelo ID.
    // No HTML precisa existir: <form id="formCadastro">
    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {
        // Agora estamos dizendo:
        // "Quando o formulário for enviado (botão Enviar clicado)..."
        formCadastro.addEventListener("submit", async (e) => {
            // Impede o comportamento padrão do navegador.
            // Normalmente o formulário recarrega a página.
            // Isso bloqueia o recarregamento.
            e.preventDefault();
            // Aqui acontece a parte mais importante:
            // 1) new FormData(formCadastro) → pega todos os campos do formulário
            // 2) Object.fromEntries(...) → transforma esses dados em um objeto JavaScript
            const dados = Object.fromEntries(
                new FormData(formCadastro)
            );
            try {
                // 🚀 Envia os dados ao backend (rota /cadastrar) via POST
                const resp = await fetch('/cadastrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });
                // 💬 Recebe a resposta do Flask (JSON)
                const result = await resp.json();
                // 📢 Exibe a mensagem de retorno para o usuário
                document.getElementById('mensagem').innerText = result.message;
                // 🧹 Limpa os campos após o envio
                formCadastro.reset();
            } catch (err) {
                // ⚠️ Caso algo dê errado (servidor fora do ar, etc.)
                alert('Erro de comunicação com o servidor: ' + err);
            }
            // Agora vamos mostrar os dados no Console (F12 → Console)

            console.log("Dados capturados:");
            // Mostra apenas o campo nome
            console.log("Nome:", dados.nome);
            // Mostra o campo email (só funciona se existir no HTML)
            console.log("Email:", dados.email);
            // Mostra o campo telefone (só funciona se existir no HTML)
            console.log("Telefone:", dados.telefone);
            // Mostra o objeto completo com todos os dados
            console.log(dados);
        });
    }
});