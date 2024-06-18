function obterMensagens() {
  var consulta = $.ajax({
    url: "https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens",
    method: "GET",
    dataType: "json",
  });

  consulta.done(function (data) {
    const table = document.querySelector("#Mensagens tbody");
    table.innerHTML = "";
    data.forEach((mensagem) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${mensagem.id}</td><td>${mensagem.nome}</td><td>${mensagem.mensagem}</td>`;
      table.appendChild(row);
    });
  });

  consulta.fail(function () {
    console.log("Falha ao obter mensagens.");
  });
}
obterMensagens();

function inserirMensagem(mensagem) {
  const intputNome = document.getElementById("nome").value;
  const intputEmai = document.getElementById("email").value;
  const intputMensagem = document.getElementById("msg").value;

  mensagem = {
    nome: intputNome,
    email: intputEmai,
    mensagem: intputMensagem,
  };

  console.log(mensagem);

  var inserir = $.ajax({
    url: "https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens",
    method: "POST",
    data: JSON.stringify(mensagem),
    dataType: "json",
    async: false,
    contentType: "application/json",
  });
  inserir.done(function (data) {
    console.log("MEnsagem inserida com sucesso");
  });
}

function validarUsuario(objLoginSenha) {
  const intputEmail = document.getElementById("email").value;
  const intputSenha = document.getElementById("senha").value;

  objLoginSenha = {
    email: intputEmail,
    senha: intputSenha,
  };

  if (objLoginSenha.email == "" || objLoginSenha.senha == "") {
    alert("Preencha os campos de email e senha");
    return false;
  }

  //redirect to mensagem.html
  if (!retorno) {
    window.location.replace("mensagens.html");
  } else {
    alert("Usuário ou senha inválidos");
    return false;
  }

  var retorno = false;

  var validacao = $.ajax({
    url: "https://app-uniesp-p2-b8d2992ac568.herokuapp.com/usuarios/validar",
    method: "POST",
    dataType: "json",
    async: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    contentType: "application/json",
    data: JSON.stringify(objLoginSenha),
  }).fail(function () {
    return retorno;
  });

  validacao.done(function (data) {
    retorno = data;
  });
  console.log(retorno);
  return retorno;
}
