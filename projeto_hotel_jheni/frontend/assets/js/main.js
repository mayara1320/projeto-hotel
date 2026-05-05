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

    if (btnBuscar) {
        btnBuscar.addEventListener('click', async () => {
            //pega o nome digitado pelo usuario
            const nome= document.getElementById('campoBusca').value;
            //🚀 faz uma requisição GET ao Flask, enviando o nome como parâmetro
            const resp = await fetch(`/bucar?nome=${nome}`);
            const clientes = await resp.json(); //🕹️ recebe lista de clientes

            const tabela = document.getElementById('tabelaResultados');
            tabela.innerHTML = ''; //Limpa a tabela antes de exibir os novos resultados

            // Para cada clientes retornado, cria uma nova linha na tabela HTML
            clientes.forEach(cli => {
               const row =`
               <tr>
                <td>${cli.ID}</td>
                <td>${cli.Nome}</td>
                <td>${cli.CPF}</td>
                <td>${cli.Email}</td>
                <td>${cli.Telefone}</td>
                <td><ahref="/alterar?id=${cli.ID}" class="bnt bnt-sm bnt-warning"> Editar</a></td>
               </tr>`;
               tabela.innerHTML += row;
            });
        

        });
    }


    formAlterar.addEventListener('submit', async (e) =>{
        e.preventDefault()

        // monta um objeto com os novos  dados digitais
        const dados = {
            nome: nome.value,
            cpf: cpf.value,
            email: email.value,
            telefone: telefone.value,
            endereco: endereco.value,
            observacoes: observacoes.value,
        };
         
        //envia para o backend (rotas /apii/atualizar/<idv>)
        const resp = await fetch(`/api/atualizar/${id}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(dados)
         });
  
         const result = await resp.json();
         mensagem.ineerText = result.message; // mostra o retorno na tela
  
      });
  
    
    



    
    

});