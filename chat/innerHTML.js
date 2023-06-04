function mainUserDiv({nome, avatar}) {
    const usersList = document.querySelector('#usuarios')
    // Cria a div principal
    var divPrincipal = document.createElement("div");
    divPrincipal.classList.add("main-usuarios-config");

    // Cria a div do usuário
    var divUsuario = document.createElement("div");
    divUsuario.classList.add("main-usuarios-config-user");

    // Cria a tag de imagem do usuário
    var imgUsuario = document.createElement("img");
    imgUsuario.src = avatar
    imgUsuario.alt = "";

    // Cria o parágrafo com o nome do usuário
    var pUsuario = document.createElement("p");
    pUsuario.innerText = nome

    // Cria a div de curtida do usuário
    var divCurtidaUsuario = document.createElement("div");
    divCurtidaUsuario.classList.add("curtida", "sem");

    // Cria o ícone de coração curtido do usuário
    var iconCurtidoUsuario = document.createElement("ion-icon");
    iconCurtidoUsuario.name = "heart";
    iconCurtidoUsuario.classList.add("curti");

    // Cria o parágrafo com o número de curtidas do usuário
    var pCurtidasUsuario = document.createElement("p");
    pCurtidasUsuario.innerText = "0";

    // Adiciona os elementos filhos à div de curtida do usuário
    divCurtidaUsuario.appendChild(iconCurtidoUsuario);
    divCurtidaUsuario.appendChild(pCurtidasUsuario);

    // Adiciona os elementos filhos à div do usuário
    divUsuario.appendChild(imgUsuario);
    divUsuario.appendChild(pUsuario);
    divUsuario.appendChild(divCurtidaUsuario);

    // Cria a div de saída
    var divSaida = document.createElement("div");
    divSaida.classList.add("main-usuarios-config-exit");

    // Cria o ícone de saída
    var iconSaida = document.createElement("ion-icon");
    iconSaida.name = "log-out-outline";

    // Adiciona o ícone de saída à div de saída
    divSaida.appendChild(iconSaida);

    // Adiciona os elementos filhos à div principal
    divPrincipal.appendChild(divUsuario);
    divPrincipal.appendChild(divSaida);

    // Adiciona a div principal ao corpo do documento HTML
    usersList.appendChild(divPrincipal);

    ////////////

    const header = document.querySelector("#header")
    header.innerHTML = ''
    
    // Cria a div do usuário no cabeçalho
    var divUsuario = document.createElement("div");
    divUsuario.classList.add("header-config-user");

    // Cria a tag de imagem do usuário
    var imgUsuario = document.createElement("img");
    imgUsuario.src = avatar;
    imgUsuario.alt = "";

    // Cria o parágrafo com o nome do usuário
    var pUsuario = document.createElement("p");
    pUsuario.innerText = nome;

    // Cria a div de curtida do usuário
    var divCurtidaUsuario = document.createElement("div");
    divCurtidaUsuario.classList.add("curtida", "sem");

    // Cria o ícone de coração curtido do usuário
    var iconCurtidoUsuario = document.createElement("ion-icon");
    iconCurtidoUsuario.name = "heart";
    iconCurtidoUsuario.classList.add("curti");

    // Cria o parágrafo com o número de curtidas do usuário
    var pCurtidasUsuario = document.createElement("p");
    pCurtidasUsuario.innerText = "0";

    // Adiciona os elementos filhos à div de curtida do usuário
    divCurtidaUsuario.appendChild(iconCurtidoUsuario);
    divCurtidaUsuario.appendChild(pCurtidasUsuario);

    // Adiciona os elementos filhos à div do usuário no cabeçalho
    divUsuario.appendChild(imgUsuario);
    divUsuario.appendChild(pUsuario);
    divUsuario.appendChild(divCurtidaUsuario);

    // Cria a div de saída no cabeçalho
    var divSaida = document.createElement("div");
    divSaida.classList.add("header-config-exit");

    // Cria o ícone de saída
    var iconSaida = document.createElement("ion-icon");
    iconSaida.name = "log-out-outline";

    // Adiciona o ícone de saída à div de saída no cabeçalho
    divSaida.appendChild(iconSaida);

    // Cria a div do menu no cabeçalho
    var divMenu = document.createElement("div");
    divMenu.classList.add("header-config-menu");
    divMenu.id = "menu";

    // Cria as spans do menu
    for (var i = 1; i <= 3; i++) {
    var spanLine = document.createElement("span");
    spanLine.classList.add("line");
    spanLine.id = "l" + i;
    divMenu.appendChild(spanLine);
    }

    // Adiciona as divs ao corpo do documento HTML
    header.appendChild(divUsuario);
    header.appendChild(divSaida);
    header.appendChild(divMenu);

}

function userDiv({nome, avatar, id}) {
    const usersList = document.querySelector('#usuarios')
    // Cria a div principal
    var divPrincipal = document.createElement("div");
    divPrincipal.classList.add("main-usuarios-user");
    divPrincipal.id = 'id' + id

    // Cria a tag de imagem
    var img = document.createElement("img");
    img.src = avatar
    img.alt = "";

    // Cria o parágrafo com o nome
    var p = document.createElement("p");
    p.innerText = nome

    // Cria a div de curtida
    var divCurtida = document.createElement("div");
    divCurtida.classList.add("curtida", "sem");

    // Cria o ícone de coração não curtido
    var iconNaoCurtido = document.createElement("ion-icon");
    iconNaoCurtido.name = "heart-outline";
    iconNaoCurtido.classList.add("nocurti");

    // Cria o ícone de coração curtido
    var iconCurtido = document.createElement("ion-icon");
    iconCurtido.name = "heart";
    iconCurtido.classList.add("curti");

    // Cria o parágrafo com o número de curtidas
    var pCurtidas = document.createElement("p");
    pCurtidas.innerText = "0";

    // Adiciona os elementos filhos à div de curtida
    divCurtida.appendChild(iconNaoCurtido);
    divCurtida.appendChild(iconCurtido);
    divCurtida.appendChild(pCurtidas);

    // Adiciona os elementos filhos à div principal
    divPrincipal.appendChild(img);
    divPrincipal.appendChild(p);
    divPrincipal.appendChild(divCurtida);

    // Adiciona a div principal ao corpo do documento HTML
    usersList.appendChild(divPrincipal);

}

function mensagemRemetente({mensagem, nome}){
    const conversa = document.querySelector("#conversa")
    // Cria a div principal
    var divMensagem = document.createElement("div");
    divMensagem.classList.add("main-conversa-mensagens-mensagem", "meu", "text");

    // Cria o parágrafo com o nome
    var pNome = document.createElement("p");
    pNome.classList.add("nome");
    pNome.innerText = nome;

    // Cria o parágrafo com a mensagem
    var pMensagem = document.createElement("p");
    pMensagem.classList.add("mensagem");
    pMensagem.innerText = mensagem;

    // Adiciona os parágrafos à div principal
    divMensagem.appendChild(pNome);
    divMensagem.appendChild(pMensagem);

    // Adiciona a div principal ao corpo do documento HTML
    conversa.appendChild(divMensagem);
}

function mensagemDestinatari({mensagem, nome}) {
    const conversa = document.querySelector("#conversa")
    // Cria a div principal
    var divMensagem = document.createElement("div");
    divMensagem.classList.add("main-conversa-mensagens-mensagem", "seu", "text");

    // Cria o parágrafo com o nome
    var pNome = document.createElement("p");
    pNome.classList.add("nome");
    pNome.innerText = nome;

    // Cria o parágrafo com a mensagem
    var pMensagem = document.createElement("p");
    pMensagem.classList.add("mensagem");
    pMensagem.innerText = mensagem;

    // Adiciona os parágrafos à div principal
    divMensagem.appendChild(pNome);
    divMensagem.appendChild(pMensagem);

    // Adiciona a div principal ao corpo do documento HTML
    conversa.appendChild(divMensagem);
}