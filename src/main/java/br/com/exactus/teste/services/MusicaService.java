package br.com.exactus.teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.exactus.teste.models.Artista;
import br.com.exactus.teste.models.Disco;
import br.com.exactus.teste.models.Genero;
import br.com.exactus.teste.models.Musica;
import br.com.exactus.teste.repositorys.DiscoRepository;
import br.com.exactus.teste.repositorys.MusicaRepository;
@Service
public class MusicaService {
  @Autowired
  private MusicaRepository musicaRepository;
  @Autowired
  private DiscoRepository discoRepository;

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

  public ResponseEntity<Musica> atualizarMusica(Musica musicaNova, long id){
	Musica musicaAntiga = musicaRepository.findById(id).orElse(null);
    if (musicaAntiga == null) {
      return ResponseEntity.badRequest().build();
    }
    musicaNova.setId(id);
    return ResponseEntity.ok(musicaRepository.save(musicaNova));
  }

  public ResponseEntity<Musica> excluirMusica(long id){
	Musica musica = musicaRepository.findById(id).orElse(null);
    if (musica == null) {
      return ResponseEntity.badRequest().build();
    }
    Disco disco = discoRepository.findById(musica.getDiscoId()).orElse(null);
    if (disco != null) {
      disco.setQtdMusicas(disco.getQtdMusicas() - 1);
      discoRepository.save(disco);
    }
    musicaRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
  public ResponseEntity<?> vincularDisco(long musicaId, long discoId) {
		Musica musica = musicaRepository.findById(musicaId).orElse(null);
		Disco disco = discoRepository.findById(discoId).orElse(null);
		if (musica == null || disco == null) {
			return ResponseEntity.badRequest().build();
		}
		if (musica.getDiscoId() == musicaId) {
			return ResponseEntity.ok().build();
		}else if (musica.getDiscoId() != 0) {
			return ResponseEntity.badRequest().build();
		}
		musica.setDiscoId(discoId);
		disco.setQtdMusicas(disco.getQtdMusicas() + 1);
		discoRepository.save(disco);
		musicaRepository.save(musica);
		return ResponseEntity.ok().build();
	}
  
  public ResponseEntity<List<Musica>> buscarPorDisco(long discoId){
	  return ResponseEntity.ok(musicaRepository.findAllByDiscoId(discoId));
  }
  
  public ResponseEntity<List<Musica>> buscarPorGenero(Genero genero){
	  return ResponseEntity.ok(musicaRepository.findAllByGeneros(genero));
  }
  
  public ResponseEntity<List<Musica>> buscarPorNome(String nome){
	  nome = "%"+nome+"%";
	  return ResponseEntity.ok(musicaRepository.findByNomeLike(nome));
  }
}
