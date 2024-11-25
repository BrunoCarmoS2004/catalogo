const BASE_URL = "http://localhost:8081/artistas"; 
async function makeRequest(endpoint, method = "GET", body = null) {
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
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", listarArtistas);

document.getElementById("buscar-artista").addEventListener("click", () => {
  const id = document.getElementById("artista-id").value;
  if (id) {
    listarArtistaPorId(id);
  } else {
    alert("Por favor, insira um ID válido.");
  }
});


async function listarArtistas() {
  try {
    const artistas = await makeRequest("/listar");
    const container = document.getElementById("artistas-container");
    container.innerHTML = ""; 

    artistas.forEach(artista => {
      const artistaDiv = document.createElement("div");
      artistaDiv.innerHTML = `
        <h3>${artista.nome}</h3>
        <p>Quantidade de Discos: ${artista.qtdDiscos}</p>
        <p>Gêneros: ${artista.generos.join(", ")}</p>
        <h4>Discos:</h4>
        <ul>
          ${artista.disco.map(disco => `<li>${disco.titulo}</li>`).join("")}
        </ul>
        <button class="atualizar-artista" data-id="${artista.id}">Atualizar</button>
        <button class="deletar-artista" data-id="${artista.id}">Deletar</button>
        <hr>
      `;
      container.appendChild(artistaDiv);
    });

    const botoesAtualizar = container.querySelectorAll(".atualizar-artista");
    botoesAtualizar.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        console.log(id)
        window.location.href = `/html/artistas/pgAtualizarArtista.html?id=${id}`; 
      });
    });

    const botoesDeletar = container.querySelectorAll(".deletar-artista");
    botoesDeletar.forEach(botao => {
      botao.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id");
        console.log(id)
        const confirmacao = confirm("Tem certeza que deseja deletar este artista?");
        if (confirmacao) {
          try {
            await excluirArtista(id); 
            alert("Artista deletado com sucesso.");
            listarArtistas(); 
          } catch (error) {
            console.error("Erro ao deletar artista:", error);
            alert("Erro ao tentar deletar o artista.");
          }
        }
      });
    });
  } catch (error) {
    console.error("Erro ao listar artistas:", error);
  }
}

async function listarArtistaPorId(id) {
  try {
    const artista = await makeRequest(`/listar/${id}`);
    const detalhes = document.getElementById("artista-detalhes");
    detalhes.innerHTML = `
      <h3>${artista.nome}</h3>
      <p>Quantidade de Discos: ${artista.qtdDiscos}</p>
      <p>Gêneros: ${artista.generos.join(", ")}</p>
      <h4>Discos:</h4>
      <ul>
        ${artista.disco.map(disco => `<li>${disco.titulo}</li>`).join("")}
      </ul>
      <button id="atualizar-artista">Atualizar</button>
      <button id="deletar-artista">Deletar</button>
    `;

    document.getElementById("atualizar-artista").addEventListener("click", async () => {
      console.log(id)
      window.location.href = `/html/artistas/pgAtualizarArtista.html?id=${id}`;
    });
      document.getElementById("deletar-artista").addEventListener("click", async () => {
      const confirmacao = confirm(`Tem certeza que deseja deletar o artista "${artista.nome}"?`);
      if (confirmacao) {
        try {
          await excluirArtista(id);
          alert("Artista deletado com sucesso.");
          detalhes.innerHTML = ""; 
        } catch (error) {
          console.error("Erro ao deletar artista:", error);
          alert("Erro ao tentar deletar o artista.");
        }
      }
    });
  } catch (error) {
    console.error("Erro ao buscar artista por ID:", error);
  }
}

async function excluirArtista(id) {
  return await makeRequest(`/excluir/${id}`, "DELETE");
}