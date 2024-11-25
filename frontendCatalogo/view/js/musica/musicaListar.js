const BASE_URL_MUSICAS = "http://localhost:8081/musicas"; 

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


document.addEventListener("DOMContentLoaded", listarMusica);

document.getElementById("buscar-musica").addEventListener("click", () => {
  const id = document.getElementById("musica-id").value;
  if (id) {
    listarMusicaPorId(id);
  } else {
    alert("Por favor, insira um ID válido.");
  }
});


async function listarMusica() {
  try {
    const musicas = await makeRequest("/listar");
    const container = document.getElementById("musica-container");
    container.innerHTML = ""; 

    musicas.forEach(musica => {
      const musicaDiv = document.createElement("div");
      musicaDiv.innerHTML = `
        <h3>${musica.nome}</h3>
        <p>Ano de lançamento: ${musica.lancamento}</p>
        <p>URL da musica: ${musica.url}</p>
        <p>Gêneros: ${musica.generos.join(", ")}</p>
        <button class="atualizar-musica" data-id="${musica.id}">Atualizar</button>
        <button class="deletar-musica" data-id="${musica.id}">Deletar</button>
        <hr>
      `;
      container.appendChild(musicaDiv);
    });

    const botoesAtualizar = container.querySelectorAll(".atualizar-musica");
    botoesAtualizar.forEach(botao => {
      botao.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        console.log(id)
        window.location.href = `/html/musica/pgAtualizarMusica.html?id=${id}`;
      });
    });

    const botoesDeletar = container.querySelectorAll(".deletar-musica");
    botoesDeletar.forEach(botao => {
      botao.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id");
        console.log(id)
        const confirmacao = confirm("Tem certeza que deseja deletar esta musica?");
        if (confirmacao) {
          try {
            await excluirMusica(id); 
            alert("Musica deletado com sucesso.");
            listarMusica(); 
          } catch (error) {
            console.error("Erro ao deletar musica:", error);
            alert("Erro ao tentar deletar o musica.");
          }
        }
      });
    });
  } catch (error) {
    console.error("Erro ao listar musica:", error);
  }
}

async function listarMusicaPorId(id) {
  try {
    const musica = await makeRequest(`/listar/${id}`);
    const detalhes = document.getElementById("musica-detalhes");
    detalhes.innerHTML = `
        <h3>${musica.nome}</h3>
        <p>Ano de lançamento: ${musica.lancamento}</p>
        <p>URL da musica: ${musica.url}</p>
        <p>Gêneros: ${musica.generos.join(", ")}</p>
        <button id="atualizar-musica">Atualizar</button>
        <button id="deletar-musica">Deletar</button>
        <hr>
      `;

    document.getElementById("atualizar-musica").addEventListener("click", async () => {
      console.log(id)
      window.location.href = `/html/musica/pgAtualizarMusica.html?id=${id}`; 
    });
    document.getElementById("deletar-musica").addEventListener("click", async () => {
      const confirmacao = confirm(`Tem certeza que deseja deletar o musica "${musica.nome}"?`);
      if (confirmacao) {
        try {
          await excluirMusica(id);
          alert("Musica deletado com sucesso.");
          detalhes.innerHTML = ""; 
          listarMusica(); 
        } catch (error) {
          console.error("Erro ao deletar musica:", error);
          alert("Erro ao tentar deletar o musica.");
        }
      }
    });
  } catch (error) {
    console.error("Erro ao buscar musica por ID:", error);
  }
}

async function excluirMusica(id) {
  return await makeRequest(`/excluir/${id}`, "DELETE");
}