package br.com.exactus.teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.exactus.teste.models.Musica;
import br.com.exactus.teste.repositorys.MusicaRepository;
@Service
public class MusicaService {
    @Autowired
  private MusicaRepository musicaRepository;

  public ResponseEntity<List<Musica>> listarMusicas(){
    return ResponseEntity.ok(musicaRepository.findAll());
  }

  public ResponseEntity<Musica> listarPorId(long id){
    Musica musica = musicaRepository.findById(id).orElse(null);
    if (musica == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(musica);
  }

  public ResponseEntity<Musica> criarMusica(Musica musica){
    if (musica == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(musicaRepository.save(musica));
  }

  public ResponseEntity<Musica> atualizarMusica(Musica musica, long id){
    if (musicaRepository.findById(id).orElse(null) == null) {
      return ResponseEntity.badRequest().build();
    }
    musica.setId(id);
    return ResponseEntity.ok(musicaRepository.save(musica));
  }

  public ResponseEntity<Musica> excluirMusica(long id){
    if (musicaRepository.findById(id).orElse(null) == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok().build();
  }
}
