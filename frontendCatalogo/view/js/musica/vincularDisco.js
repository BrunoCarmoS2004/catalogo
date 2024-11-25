 // Função para listar artistas
 const BASE_URL_DISCOS = "http://localhost:8081/discos"; 
 const BASE_URL_MUSICAS = "http://localhost:8081/musicas";

async function makeRequestMusica(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL_MUSICAS}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function makeRequestDisco(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL_DISCOS}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

 async function listarDiscos() {
  try {
    const discos = await makeRequestDisco("/listar");
    const container = document.getElementById("discos-container");
    const backButton = document.getElementById("back-button");
    container.innerHTML = ""; 
    backButton.style.display = "none"; 
    document.getElementById("musica-container").style.display = "none"; 
    container.style.display = "block"; 

    discos.forEach(disco => {
      const discoDiv = document.createElement("div");
      discoDiv.innerHTML = `
        <h3>${disco.titulo}</h3>
        <p>Quantidade de Musicas: ${disco.qtdMusicas}</p>
        <p>Gêneros: ${disco.generos.join(", ")}</p>
        <button class="listar-musicas" data-id="${disco.id}">Ver Musicas</button>
      `;
      container.appendChild(discoDiv);
    });

    const botoes = document.querySelectorAll(".listar-musicas");
    botoes.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const discoId = event.target.getAttribute("data-id");
        listarMusicas(discoId); 
      });
    });
  } catch (error) {
    console.error("Erro ao listar discos:", error);
  }
}

async function listarMusicas(discoId) {
  try {
    const musicas = await makeRequestMusica("/listar");
    const container = document.getElementById("musica-container");
    const backButton = document.getElementById("back-button");
    container.innerHTML = ""; 
    backButton.style.display = "block"; 
    document.getElementById("discos-container").style.display = "none"; 
    container.style.display = "block"; 

    //NÃO É POSSIVEL MUDAR O ID DISCOID DA MUSICA POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 
    //NÃO É POSSIVEL MUDAR O ID DISCOID DA MUSICA POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 
    //NÃO É POSSIVEL MUDAR O ID DISCOID DA MUSICA POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 
    //NÃO É POSSIVEL MUDAR O ID DISCOID DA MUSICA POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 

    musicas.forEach(musica => {
      const musicaDiv = document.createElement("div");
      musicaDiv.innerHTML = `
        <h3>${musica.nome}</h3>
        <p>Ano de lançamento: ${musica.lancamento}</p>
        <p>URL da musica: ${musica.url}</p>
        <p>Id do disco vinculado (Não é possivel mudar): ${musica.discoId}</p>
        <p>Gêneros: ${musica.generos.join(", ")}</p>
        <button class="vincular-musica" data-musica-id="${musica.id}" data-disco-id="${discoId}">Vincular Musica</button>
      `;
      container.appendChild(musicaDiv);
    });

    const botoes = document.querySelectorAll(".vincular-musica");
    botoes.forEach(botao => {
      botao.addEventListener("click", async (event) => {
        const musicaId = event.target.getAttribute("data-musica-id");
        const discoId = event.target.getAttribute("data-disco-id");
        try {
          await vincularDisco(musicaId, discoId);
          alert("Musica vinculada com sucesso!");
        } catch (error) {
          console.error("Erro ao vincular Musica:", error);
          alert("Erro ao tentar vincular o Musica.");
        }
      });
    });

    backButton.addEventListener("click", listarDiscos);
  } catch (error) {
    console.error("Erro ao listar Musica:", error);
  }
}

listarDiscos();

async function vincularDisco(musicaId, discoId) {
  return await makeRequestMusica(`/vincular/${musicaId}/${discoId}`, "PUT");
}


