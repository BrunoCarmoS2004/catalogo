 // Função para listar artistas
 const BASE_URL_DISCOS = "http://localhost:8081/discos"; 
 const BASE_URL_ARTISTA = "http://localhost:8081/artistas"; 

async function makeRequestArtista(endpoint, method = "GET", body = null) {
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
    const response = await fetch(`${BASE_URL_ARTISTA}${endpoint}`, options);
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

 async function listarArtistas() {
  try {
    const artistas = await makeRequestArtista("/listar");
    const container = document.getElementById("artistas-container");
    const backButton = document.getElementById("back-button");
    container.innerHTML = ""; 
    backButton.style.display = "none"; 
    document.getElementById("disco-container").style.display = "none"; 
    container.style.display = "block"; 

    artistas.forEach(artista => {
      const artistaDiv = document.createElement("div");
      artistaDiv.innerHTML = `
        <h3>${artista.nome}</h3>
        <p>Quantidade de Discos: ${artista.qtdDiscos}</p>
        <p>Gêneros: ${artista.generos.join(", ")}</p>
        <button class="listar-discos" data-id="${artista.id}">Ver Discos</button>
      `;
      container.appendChild(artistaDiv);
    });

    const botoes = document.querySelectorAll(".listar-discos");
    botoes.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const artistaId = event.target.getAttribute("data-id");
        listarDiscos(artistaId); 
      });
    });
  } catch (error) {
    console.error("Erro ao listar artistas:", error);
  }
}

async function listarDiscos(artistaId) {
  try {
    const discos = await makeRequestDisco("/listar"); 
    const container = document.getElementById("disco-container");
    const backButton = document.getElementById("back-button");
    container.innerHTML = ""; 
    backButton.style.display = "block"; 
    document.getElementById("artistas-container").style.display = "none";
    container.style.display = "block"; 

    //NÃO É POSSIVEL MUDAR O ID ARTISTAID DO DISCO POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 
    //NÃO É POSSIVEL MUDAR O ID ARTISTAID DO DISCO POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 
    //NÃO É POSSIVEL MUDAR O ID ARTISTAID DO DISCO POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 
    //NÃO É POSSIVEL MUDAR O ID ARTISTAID DO DISCO POR ESCOLHA MINHA!!!! Não foi citado se podia ou não 
    discos.forEach(disco => {
      const discoDiv = document.createElement("div");
      discoDiv.innerHTML = `
        <h3>${disco.titulo}</h3>
        <p>Ano de lançamento: ${disco.anoLancamento}</p>
        <p>Quantidade de músicas: ${disco.qtdMusicas}</p>
        <p>Id do Artista vinculado (Não é possivel mudar): ${disco.artistaId}</p>
        <p>Gêneros: ${disco.generos.join(", ")}</p>
        <button class="vincular-disco" data-disco-id="${disco.id}" data-artista-id="${artistaId}">Vincular Disco</button>
      `;
      container.appendChild(discoDiv);
    });

    const botoes = document.querySelectorAll(".vincular-disco");
    botoes.forEach(botao => {
      botao.addEventListener("click", async (event) => {
        const discoId = event.target.getAttribute("data-disco-id");
        const artistaId = event.target.getAttribute("data-artista-id");
        try {
          await vincularDisco(artistaId, discoId);
          alert("Disco vinculado com sucesso!");
        } catch (error) {
          console.error("Erro ao vincular disco:", error);
          alert("Erro ao tentar vincular o disco.");
        }
      });
    });

    backButton.addEventListener("click", listarArtistas);
  } catch (error) {
    console.error("Erro ao listar discos:", error);
  }
}

listarArtistas();

async function vincularDisco(artistaId, discoId) {
  console.log(artistaId+", "+discoId);
  
  return await makeRequestArtista(`/vincular/${artistaId}/${discoId}`, "PUT");
}


