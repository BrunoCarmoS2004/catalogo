package br.com.exactus.teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.exactus.teste.models.Artista;
import br.com.exactus.teste.models.Disco;
import br.com.exactus.teste.models.Genero;
import br.com.exactus.teste.repositorys.ArtistasRepository;
import br.com.exactus.teste.repositorys.DiscoRepository;
@Service
public class DiscoService {
  @Autowired
  private DiscoRepository discoRepository;
  @Autowired
  private ArtistasRepository artistasRepository;
  public ResponseEntity<List<Disco>> listarDiscos(){
    return ResponseEntity.ok(discoRepository.findAll());
  }

  public ResponseEntity<Disco> listarPorId(long id){
    Disco disco = discoRepository.findById(id).orElse(null);
    if (disco == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(disco);
  }

  public ResponseEntity<Disco> criarDisco(Disco disco){
    if (disco == null) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(discoRepository.save(disco));
  }

  public ResponseEntity<Disco> atualizarDisco(Disco discoNovo, long id){
	Disco discoAntigo = discoRepository.findById(id).orElse(null);
    if (discoAntigo == null) {
      return ResponseEntity.badRequest().build();
    }
    discoNovo.setId(id);
    return ResponseEntity.ok(discoRepository.save(discoNovo));
  }

  public ResponseEntity<Disco> excluirDisco(long id){
	Disco disco = discoRepository.findById(id).orElse(null);
    if (disco == null) {
      return ResponseEntity.badRequest().build();
    }
    discoRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
  
  public ResponseEntity<List<Disco>> buscarPorArtista(long artistaId){
	  return ResponseEntity.ok(discoRepository.findByArtistaId(artistaId));
  }
  
  public ResponseEntity<List<Disco>> buscarPorGenero(Genero genero){
	  return ResponseEntity.ok(discoRepository.findAllByGeneros(genero));
  }
  
  public ResponseEntity<List<Disco>> buscarPorTitulo(String nome){
	  nome = "%"+nome+"%";
	  return ResponseEntity.ok(discoRepository.findByTituloLike(nome));
  }
}
