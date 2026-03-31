//aqui estamos dizendo:
//"espere o  html carregar completamente antes de executar o javaScript"
document.addEventListener("DOMContentLoaded" , function () {

  //aqui estamos pegando o formulario pelo ID
  //no HTML precisa existir; <form id="formcadastro">
  const formcadastro = document.getElementById("formcadastro");

  if (cadastro){

  
 //agora estamos dizendo:
  //"quando o formulario for enviado (botao enviar clicado")...
  formcadastro.addEventListener("submit" , async (e) =>{
    e.preventDefault();
        const dados = Object.fromEntries(
          new FormData(formcadastro)

        );
      try{
    //envia os dados ao backend (rota / api/cadastrar) via post
    const resp = await fetch('/api/cadastrar' ,{
       method: 'post',
       headers: { 'content-type': 'application/json'},
       body: JSON.stringify(DADOS)

    });
     //recebe a resposta do flask (JSON)
     const result = await resp.json();
     //exibe a mensagem de retorno para o usuario 
     Document.getElementById('mensagem'). innertext = result.menssage
     //limpa os campos após o envio 
     formcadastro.reset();

      }catch (err){
       //caso algo de errado (servidor fora do ar, etc...)
       alert('erro de comunicação com o servidor:' + err);

       }
       
       //agora vamos mostrar os dados no console (f12 -> console)

        console.log("dados capturados:"); 
        // mostra apenas o campo nome
        console.log("nome:", dados.nome);
        //mostra o campo do email (so ffunciona se exstir o html)
        console.log("email:", dados.email);
        //mostra o campo de telefone (so funciona se existir no html)
        console.log("telefone:", dados.telefone);
        //mostra o objeto completo com todos os dados
        console.log(dados);
    })

  }

});

  
