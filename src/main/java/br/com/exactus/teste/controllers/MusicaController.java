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

import br.com.exactus.teste.models.Disco;
import br.com.exactus.teste.models.Genero;
import br.com.exactus.teste.models.Musica;
import br.com.exactus.teste.services.MusicaService;

@RestController
@RequestMapping("/musicas")
public class MusicaController {
  @Autowired
  private MusicaService musicaService;
  @GetMapping("/listar")
  public ResponseEntity<List<Musica>> listarDiscos(){
    return musicaService.listarMusicas();
  }
  @GetMapping("/listar/{id}")
  public ResponseEntity<Musica> listarPorId(@PathVariable long id){
    return musicaService.listarPorId(id);
  }
  @PostMapping("/criar")
  public ResponseEntity<Musica> criarMusica(@RequestBody Musica musica){
    return musicaService.criarMusica(musica);
  }
  @PutMapping("/atualizar/{id}")
  public ResponseEntity<Musica> atualizarDisco(@RequestBody Musica musica, @PathVariable long id){
    return musicaService.atualizarMusica(musica, id);
  }
  @DeleteMapping("/excluir/{id}")
  public ResponseEntity<Musica> excluirDisco(@PathVariable long id){
    return musicaService.excluirMusica(id);
  }
  
  @GetMapping("/listar/titulo/{titulo}")
  public ResponseEntity<List<Musica>> buscarPorNome(@PathVariable String titulo){
    return musicaService.buscarPorNome(titulo);
  }
		  
  @GetMapping("/listar/genero/{genero}")
  public ResponseEntity<List<Musica>> buscarPorGenero(@PathVariable Genero genero){
    return musicaService.buscarPorGenero(genero);
  }
  
  @GetMapping("/listar/disco/{discoId}")
  public ResponseEntity<List<Musica>> buscarPorDisco(@PathVariable long discoId){
    return musicaService.buscarPorDisco(discoId);
  }
  
  @PutMapping("/vincular/{musicaId}/{discoId}")
  public ResponseEntity<?> vincularDisco(@PathVariable long musicaId, @PathVariable long discoId){
	  return musicaService.vincularDisco(musicaId, discoId);
  }
}
