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

document.getElementById("form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const generosSelecionados = Array.from(document.getElementById("generos").selectedOptions).map(option => option.value);

  const attArtista = {
    nome: nome,
    generos: generosSelecionados,
    disco: []
  };

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); 
    
    const response = await atualizarArtista(id, attArtista);
    alert("Artista atualizado com sucesso!");
    console.log("Resposta:", response);
  } catch (error) {
    alert("Erro ao criar artista!");
    console.error("Erro:", error);
  }
});

async function atualizarArtista(id, artista) {
  return await makeRequest(`/atualizar/${id}`, "PUT", artista);
}