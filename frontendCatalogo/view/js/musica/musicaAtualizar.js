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

document.getElementById("form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const url = document.getElementById("url").value;
  const lancamento = document.getElementById("lancamento").value;
  const generosSelecionados = Array.from(document.getElementById("generos").selectedOptions).map(option => option.value);

  const attMusica = {
    nome: nome,
    generos: generosSelecionados,
    musicas: [],
    url: url,
    lancamento: lancamento
  };

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); 

    const response = await atualizarMusica(id,attMusica);
    alert("Musica atualizada com sucesso!");
    console.log("Resposta:", response);
  } catch (error) {
    alert("Erro ao atualizar musica!");
    console.error("Erro:", error);
  }
});

async function atualizarMusica(id, musica) {
  return await makeRequest(`/atualizar/${id}`, "PUT", musica);
}
