package br.com.exactus.teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.exactus.teste.models.Artista;
import br.com.exactus.teste.repositorys.ArtistasRepository;

@Service
public class ArtistaService {
  @Autowired
  private ArtistasRepository artistasRepository;

  public ResponseEntity<List<Artista>> listarArtistas(){
    return ResponseEntity.ok(artistasRepository.findAll());
  }

  public ResponseEntity<Artista> listarPorId(long id){
    Artista artista = artistasRepository.findById(id).orElse(null);
    if (artista == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(artista);
  }

  public ResponseEntity<Artista> criarArtista(Artista artista){
    if (artista == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(artistasRepository.save(artista));
  }

  public ResponseEntity<Artista> atualizarArtista(Artista artista, long id){
    if (artistasRepository.findById(id).orElse(null) == null) {
      return ResponseEntity.badRequest().build();
    }
    artista.setId(id);
    return ResponseEntity.ok(artistasRepository.save(artista));
  }

  public ResponseEntity<Artista> excluirArtista(long id){
    if (artistasRepository.findById(id).orElse(null) == null) {
      return ResponseEntity.badRequest().build();
    }
    artistasRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
