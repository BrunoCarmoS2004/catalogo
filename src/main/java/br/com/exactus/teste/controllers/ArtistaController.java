package br.com.exactus.teste.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.exactus.teste.models.Artista;
import br.com.exactus.teste.models.Genero;
import br.com.exactus.teste.services.ArtistaService;

@RestController
@RequestMapping("/artistas")
public class ArtistaController {
  @Autowired
  private ArtistaService artistaService;

  @GetMapping("/listar")
  public ResponseEntity<List<Artista>> listarArtistas(){
    return artistaService.listarArtistas();
  }
  @GetMapping("/listar/{id}")
  public ResponseEntity<Artista> listarPorId(@PathVariable long id){
    return artistaService.listarPorId(id);
  }
  @PostMapping("/criar")
  public ResponseEntity<Artista> criarArtista(@RequestBody Artista artista){
    return artistaService.criarArtista(artista);
  }
  @PutMapping("/atualizar/{id}")
  public ResponseEntity<Artista> atualizarArtista(@RequestBody Artista artista, @PathVariable long id){
    return artistaService.atualizarArtista(artista, id);
  }
  @DeleteMapping("/excluir/{id}")
  public ResponseEntity<Artista> excluirArtista(@PathVariable long id){
    return artistaService.excluirArtista(id);
  }
  
  @GetMapping("/listar/nome/{nome}")
  public ResponseEntity<List<Artista>> buscarPorNome(@PathVariable String nome){
    return artistaService.buscarPorNome(nome);
  }
		  
  @GetMapping("/listar/genero/{genero}")
  public ResponseEntity<List<Artista>> buscarPorGenero(@PathVariable Genero genero){
    return artistaService.buscarPorGenero(genero);
  }
  
  @PutMapping("/vincular/{artistaId}/{discoId}")
  public ResponseEntity<?> vincularDisco(@PathVariable long artistaId, @PathVariable long discoId){
	  return artistaService.vincularDisco(artistaId, discoId);
  }
}
