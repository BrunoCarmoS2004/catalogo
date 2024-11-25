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

  const novaMusica = {
    nome: nome,
    generos: generosSelecionados,
    musicas: [],
    url: url,
    lancamento: lancamento
  };

  try {
    const response = await criarMusica(novaMusica);
    alert("Musica criada com sucesso!");
    console.log("Resposta:", response);
  } catch (error) {
    alert("Erro ao criar musica!");
    console.error("Erro:", error);
  }
});

async function criarMusica(musica) {
  return await makeRequest("/criar", "POST", musica);
}

