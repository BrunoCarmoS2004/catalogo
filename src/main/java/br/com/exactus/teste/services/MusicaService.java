package br.com.exactus.teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    Disco disco = discoRepository.findById(musica.getDiscoId()).orElse(null);
    if (disco == null) {
		return ResponseEntity.badRequest().build();
	}
    disco.setQtdMusicas(disco.getQtdMusicas() + 1);
    return ResponseEntity.ok(musicaRepository.save(musica));
  }

  public ResponseEntity<Musica> atualizarMusica(Musica musicaNova, long id){
	Musica musicaAntiga = musicaRepository.findById(id).orElse(null);
    if (musicaAntiga == null) {
      return ResponseEntity.badRequest().build();
    }
    Disco discoAntigo = discoRepository.findById(musicaAntiga.getDiscoId()).orElse(null);
    discoAntigo.setQtdMusicas(discoAntigo.getQtdMusicas() - 1);
    Disco discoNovo = discoRepository.findById(musicaNova.getDiscoId()).orElse(null);
    if (discoNovo == null) {
		return ResponseEntity.badRequest().build();
	}
    discoNovo.setQtdMusicas(discoNovo.getQtdMusicas() + 1);
    discoRepository.save(discoAntigo);
    discoRepository.save(discoNovo);
    musicaNova.setId(id);
    return ResponseEntity.ok(musicaRepository.save(musicaNova));
  }

  public ResponseEntity<Musica> excluirMusica(long id){
	Musica musica = musicaRepository.findById(id).orElse(null);
    if (musica == null) {
      return ResponseEntity.badRequest().build();
    }
    Disco disco = discoRepository.findById(musica.getDiscoId()).orElse(null);
    disco.setQtdMusicas(disco.getQtdMusicas() - 1);
    discoRepository.save(disco);
    musicaRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
  
  public ResponseEntity<List<Musica>> buscarPorDisco(long discoId){
	  return ResponseEntity.ok(musicaRepository.findAllByDiscoId(discoId));
  }
  
  public ResponseEntity<List<Musica>> buscarPorGenero(Genero genero){
	  return ResponseEntity.ok(musicaRepository.findAllByGenero(genero));
  }
  
  public ResponseEntity<List<Musica>> buscarPorNome(String nome){
	  nome = "%"+nome+"%";
	  return ResponseEntity.ok(musicaRepository.findByNomeLike(nome));
  }
}
