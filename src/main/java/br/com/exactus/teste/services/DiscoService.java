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
    Artista artista = artistasRepository.findById(disco.getArtistaId()).orElse(null); 
    if (artista == null) {
		return ResponseEntity.badRequest().build();
	}
    artista.setQtdDiscos(artista.getQtdDiscos() + 1);
    return ResponseEntity.ok(discoRepository.save(disco));
  }

  public ResponseEntity<Disco> atualizarDisco(Disco discoNovo, long id){
	Disco discoAntigo = discoRepository.findById(id).orElse(null);
    if (discoAntigo == null) {
      return ResponseEntity.badRequest().build();
    }
    Artista artistaAntigo = artistasRepository.findById(discoAntigo.getArtistaId()).orElse(null);  
    artistaAntigo.setQtdDiscos(artistaAntigo.getQtdDiscos() - 1);
    Artista artistaNovo = artistasRepository.findById(discoNovo.getArtistaId()).orElse(null); 
    
    if (artistaNovo == null) {
		return ResponseEntity.badRequest().build();
	}
    artistaAntigo.setQtdDiscos(artistaAntigo.getQtdDiscos() + 1);
    artistasRepository.save(artistaAntigo);
    artistasRepository.save(artistaNovo);
    discoNovo.setId(id);
    return ResponseEntity.ok(discoRepository.save(discoNovo));
  }

  public ResponseEntity<Disco> excluirDisco(long id){
	Disco disco = discoRepository.findById(id).orElse(null);
    if (disco == null) {
      return ResponseEntity.badRequest().build();
    }
    Artista artista = artistasRepository.findById(disco.getArtistaId()).orElse(null);
    artista.setQtdDiscos(artista.getQtdDiscos() - 1);
    artistasRepository.save(artista);
    discoRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
  
  public ResponseEntity<List<Disco>> buscarPorArtista(long artistaId){
	  return ResponseEntity.ok(discoRepository.findByArtistaId(artistaId));
  }
  
  public ResponseEntity<List<Disco>> buscarPorGenero(Genero genero){
	  return ResponseEntity.ok(discoRepository.findAllByGenero(genero));
  }
  
  public ResponseEntity<List<Disco>> buscarPorTitulo(String nome){
	  nome = "%"+nome+"%";
	  return ResponseEntity.ok(discoRepository.findByTituloLike(nome));
  }
}
