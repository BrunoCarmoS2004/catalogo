const BASE_URL_DISCOS = "http://localhost:8081/discos"; 

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

document.addEventListener("DOMContentLoaded", listarDiscos);

document.getElementById("buscar-disco").addEventListener("click", () => {
  const id = document.getElementById("disco-id").value;
  if (id) {
    listarDiscoPorId(id);
  } else {
    alert("Por favor, insira um ID válido.");
  }
});


async function listarDiscos() {
  try {
    const discos = await makeRequest("/listar");
    const container = document.getElementById("disco-container");
    container.innerHTML = ""; 

    discos.forEach(disco => {
      const artistaDiv = document.createElement("div");
      artistaDiv.innerHTML = `
        <h3>${disco.titulo}</h3>
        <p>Ano de lançamento: ${disco.anoLancamento}</p>
        <p>Quantidade de Discos: ${disco.qtdMusicas}</p>
        <p>Gêneros: ${disco.generos.join(", ")}</p>
        <h4>Musicas:</h4>
        <ul>
          ${disco.musicas.map(musicas => `<li>${musicas.nome}</li>`).join("")}
        </ul>
        <button class="atualizar-disco" data-id="${disco.id}">Atualizar</button>
        <button class="deletar-disco" data-id="${disco.id}">Deletar</button>
        <hr>
      `;
      container.appendChild(artistaDiv);
    });

    const botoesAtualizar = container.querySelectorAll(".atualizar-disco");
    botoesAtualizar.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        console.log(id)
        window.location.href = `/html/discos/pgAtualizarDisco.html?id=${id}`; 
      });
    });

    const botoesDeletar = container.querySelectorAll(".deletar-disco");
    botoesDeletar.forEach(botao => {
      botao.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id");
        console.log(id)
        const confirmacao = confirm("Tem certeza que deseja deletar este disco?");
        if (confirmacao) {
          try {
            await excluirDisco(id); 
            alert("Disco deletado com sucesso.");
            listarDiscos(); 
          } catch (error) {
            console.error("Erro ao deletar disco:", error);
            alert("Erro ao tentar deletar o disco.");
          }
        }
      });
    });
  } catch (error) {
    console.error("Erro ao listar discos:", error);
  }
}

async function listarDiscoPorId(id) {
  try {
    const disco = await makeRequest(`/listar/${id}`);
    const detalhes = document.getElementById("disco-detalhes");
    detalhes.innerHTML = `
        <h3>${disco.titulo}</h3>
        <p>Ano de lançamento: ${disco.anoLancamento}</p>
        <p>Quantidade de Discos: ${disco.qtdMusicas}</p>
        <p>Gêneros: ${disco.generos.join(", ")}</p>
        <h4>Musicas:</h4>
        <ul>
          ${disco.musicas.map(musicas => `<li>${musicas.nome}</li>`).join("")}
        </ul>
        <button id="atualizar-disco">Atualizar</button>
        <button id="deletar-disco">Deletar</button>
        <hr>
      `;

    document.getElementById("atualizar-disco").addEventListener("click", async () => {
      console.log(id)
      window.location.href = `/html/discos/pgAtualizarDisco.html?id=${id}`;
    });
    document.getElementById("deletar-disco").addEventListener("click", async () => {
      const confirmacao = confirm(`Tem certeza que deseja deletar o disco "${disco.titulo}"?`);
      if (confirmacao) {
        try {
          await excluirDisco(id);
          alert("Disco deletado com sucesso.");
          detalhes.innerHTML = ""; 
          listarDiscos();
        } catch (error) {
          console.error("Erro ao deletar disco:", error);
          alert("Erro ao tentar deletar o disco.");
        }
      }
    });
  } catch (error) {
    console.error("Erro ao buscar disco por ID:", error);
  }
}

async function excluirDisco(id) {
  return await makeRequest(`/excluir/${id}`, "DELETE");
}