const BASE_URL_ARTISTA = "http://localhost:8081/artistas";
const BASE_URL_DISCO = "http://localhost:8081/discos";
const BASE_URL_MUSICA = "http://localhost:8081/musicas";

async function makeRequest(url, method = "GET", body = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

document.getElementById("search-button").addEventListener("click", async () => {
  const type = document.getElementById("search-type").value;
  const query = document.getElementById("search-input").value.trim();
  const resultContainer = document.getElementById("result");

  resultContainer.innerHTML = "";

  if (type === "artista") {
    const artistas = await makeRequest(`${BASE_URL_ARTISTA}/listar/nome/${query}`);
    console.log(artistas)
    if (artistas) renderArtista(artistas);
  } else if (type === "disco") {
    const discos = await makeRequest(`${BASE_URL_DISCO}/listar/titulo/${query}`);
    if (discos) renderDisco(discos);
  } else if (type === "musica") {
    const musicas = await makeRequest(`${BASE_URL_MUSICA}/listar/titulo/${query}`);
    if (musicas) renderMusica(musicas);
  } else if (type === "genero"){
    const musicas = await makeRequest(`${BASE_URL_MUSICA}/listar/genero/${query}`);
    const discos = await makeRequest(`${BASE_URL_DISCO}/listar/genero/${query}`);
    const artistas = await makeRequest(`${BASE_URL_ARTISTA}/listar/genero/${query}`);
    renderGenero(artistas, discos, musicas);
  }
});


function renderGenero(artistas, discos, musicas) {
  const resultContainer = document.getElementById("result");
  artistas.forEach(artista => {
    const column = document.createElement("div");
    column.className = "divPai";
    const artistColumn = document.createElement("div");
    artistColumn.className = "column";
    artistColumn.innerHTML += `
      <h2>${artista.nome}</h2>
      <p>Gêneros: ${Array.isArray(artista.generos) ? artista.generos.join(", ") : "N/A"}</p>
      <p>Quantidade de Discos: ${artista.qtdDiscos}</p>
    `;
    column.appendChild(artistColumn);
    resultContainer.appendChild(column);

  });
  discos.forEach(disco =>{
    const column = document.createElement("div");
    column.className = "divPai";
    const discoColumn = document.createElement("div");
    discoColumn.className = "column";
    discoColumn.innerHTML = `
      <h2>${disco.titulo}</h2>
      <p>Ano de Lançamento: ${disco.anoLancamento}</p>
      <p>Gêneros: ${disco.generos.join(", ")}</p>
    `;
    column.appendChild(discoColumn);
    resultContainer.appendChild(column);
  })
  musicas.forEach(musica =>{
    const column = document.createElement("div");
    column.className = "divPai";
    const musicaColumn = document.createElement("div");
    musicaColumn.className = "column";
    musicaColumn.innerHTML = `
      <h2>${musica.nome}</h2>
      <p>Lançamento: ${musica.lancamento}</p>
      <button onclick="playMusic('${musica.url}')">Tocar</button>
    `;

    
    column.appendChild(musicaColumn);
    resultContainer.appendChild(column);
  })
}


function renderArtista(artistas) {
  const resultContainer = document.getElementById("result");
  artistas.forEach(artista => {
    const column = document.createElement("div");
    column.className = "divPai";
    const artistColumn = document.createElement("div");
    artistColumn.className = "column";
    artistColumn.innerHTML += `
      <h2>${artista.nome}</h2>
      <p>Gêneros: ${Array.isArray(artista.generos) ? artista.generos.join(", ") : "N/A"}</p>
      <p>Quantidade de Discos: ${artista.qtdDiscos}</p>
    `;
  const discosColumn = document.createElement("div");
  discosColumn.className = "column";
  discosColumn.innerHTML = `<h2>Discos</h2>`;
  artista.disco.forEach(disco => {
    discosColumn.innerHTML += `
      <h3>${disco.titulo}</h3>
      <p>Ano: ${disco.anoLancamento}</p>
      <p>Músicas: ${disco.qtdMusicas}</p>
    `;
  });

  const musicasColumn = document.createElement("div");
  musicasColumn.className = "column";
  musicasColumn.innerHTML = `<h2>Músicas</h2>`;
  artista.disco.forEach(disco => {
    disco.musicas.forEach(musica => {
      musicasColumn.innerHTML += `
        <h3>${musica.nome}</h3>
        <button onclick="playMusic('${musica.url}')">Tocar</button>
      `;
    });
  });
  column.appendChild(artistColumn);
  column.appendChild(discosColumn);
  column.appendChild(musicasColumn);
  resultContainer.appendChild(column);
});
}

function renderDisco(discos) {
  const resultContainer = document.getElementById("result");
  discos.forEach(disco =>{
    const column = document.createElement("div");
    column.className = "divPai";
    const discoColumn = document.createElement("div");
    discoColumn.className = "column";
    discoColumn.innerHTML = `
      <h2>${disco.titulo}</h2>
      <p>Ano de Lançamento: ${disco.anoLancamento}</p>
      <p>Gêneros: ${disco.generos.join(", ")}</p>
    `;

    const musicasColumn = document.createElement("div");
    musicasColumn.className = "column";
    musicasColumn.innerHTML = `<h2>Músicas</h2>`;
    disco.musicas.forEach(musica => {
      musicasColumn.innerHTML += `
        <h3>${musica.nome}</h3>
        <button onclick="playMusic('${musica.url}')">Tocar</button>
      `;
    });

    column.appendChild(discoColumn);
    column.appendChild(musicasColumn);
    resultContainer.appendChild(column);
  })
}

function renderMusica(musicas) {
  const resultContainer = document.getElementById("result");
  const allMusicasColumn = document.createElement("div");
    allMusicasColumn.className = "column";
    allMusicasColumn.innerHTML = `<h2>Todas as Músicas Cadastradas</h2>`;

    makeRequest(`${BASE_URL_MUSICA}/listar`).then(musicas => {
      musicas.forEach(m => {
        allMusicasColumn.innerHTML += `
          <h3>${m.nome}</h3>
          <button onclick="playMusic('${m.url}')">Tocar</button>
        `;
      });
      allMusicasColumn.innerHTML +=`<br><br> <h2>Resultado da pesquisa:</h2> `
    });
    resultContainer.appendChild(allMusicasColumn);
  musicas.forEach(musica =>{
    const column = document.createElement("div");
    column.className = "divPai";
    const musicaColumn = document.createElement("div");
    musicaColumn.className = "column";
    musicaColumn.innerHTML = `
      <h2>${musica.nome}</h2>
      <p>Lançamento: ${musica.lancamento}</p>
      <button onclick="playMusic('${musica.url}')">Tocar</button>
    `;

    
    column.appendChild(musicaColumn);
    resultContainer.appendChild(column);
  })
}

function playMusic(url) {
  window.open(url, "_blank");
}