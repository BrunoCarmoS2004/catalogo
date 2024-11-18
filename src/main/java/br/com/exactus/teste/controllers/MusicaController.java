package br.com.exactus.teste.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<Musica> listarPorId(long id){
    return musicaService.listarPorId(id);
  }
  @PostMapping("/criar")
  public ResponseEntity<Musica> criarMusica(Musica musica){
    return musicaService.criarMusica(musica);
  }
  @PutMapping("/atualizar/{id}")
  public ResponseEntity<Musica> atualizarDisco(Musica musica, long id){
    return musicaService.atualizarMusica(musica, id);
  }
  @DeleteMapping("/excluir/{id}")
  public ResponseEntity<Musica> excluirDisco(long id){
    return musicaService.excluirMusica(id);
  }
}
