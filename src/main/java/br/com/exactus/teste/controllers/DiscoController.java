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
import br.com.exactus.teste.models.Disco;
import br.com.exactus.teste.models.Genero;
import br.com.exactus.teste.services.DiscoService;

@RestController
@RequestMapping("/discos")
public class DiscoController {
  @Autowired
  private DiscoService discoService;
  @GetMapping("/listar")
  public ResponseEntity<List<Disco>> listarDiscos(){
    return discoService.listarDiscos();
  }
  @GetMapping("/listar/{id}")
  public ResponseEntity<Disco> listarPorId(@PathVariable long id){
    return discoService.listarPorId(id);
  }
  @PostMapping("/criar")
  public ResponseEntity<Disco> criarDisco(@RequestBody Disco disco){
    return discoService.criarDisco(disco);
  }
  @PutMapping("/atualizar/{id}")
  public ResponseEntity<Disco> atualizarDisco(@RequestBody Disco disco,@PathVariable long id){
    return discoService.atualizarDisco(disco, id);
  }
  @DeleteMapping("/excluir/{id}")
  public ResponseEntity<Disco> excluirDisco(@PathVariable long id){
    return discoService.excluirDisco(id);
  }
  
  @GetMapping("/listar/titulo/{titulo}")
  public ResponseEntity<List<Disco>> buscarPorTitulo(@PathVariable String titulo){
    return discoService.buscarPorTitulo(titulo);
  }
		  
  @GetMapping("/listar/genero/{genero}")
  public ResponseEntity<List<Disco>> buscarPorGenero(@PathVariable Genero genero){
    return discoService.buscarPorGenero(genero);
  }
  
  @GetMapping("/listar/artista/{artistaId}")
  public ResponseEntity<List<Disco>> buscarPorArtista(@PathVariable long artistaId){
    return discoService.buscarPorArtista(artistaId);
  }
}
