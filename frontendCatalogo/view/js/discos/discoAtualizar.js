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

document.getElementById("form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const capa = document.getElementById("capa").value;
  const anoLancamento = document.getElementById("ano").value;
  const generosSelecionados = Array.from(document.getElementById("generos").selectedOptions).map(option => option.value);

  const attDisco = {
    titulo: titulo,
    generos: generosSelecionados,
    musicas: [],
    capa: capa,
    anoLancamento: anoLancamento
  };

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const response = await atualizarDisco(id,attDisco);
    alert("Disco criado com sucesso!");
    console.log("Resposta:", response);
  } catch (error) {
    alert("Erro ao criar disco!");
    console.error("Erro:", error);
  }
});

async function atualizarDisco(id, disco) {
  return await makeRequest(`/atualizar/${id}`, "PUT", disco);
}
