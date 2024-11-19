package br.com.exactus.teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.exactus.teste.models.Disco;
import br.com.exactus.teste.repositorys.DiscoRepository;
@Service
public class DiscoService {
  @Autowired
  private DiscoRepository discoRepository;

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

  public ResponseEntity<Disco> atualizarDisco(Disco disco, long id){
    if (discoRepository.findById(id).orElse(null) == null) {
      return ResponseEntity.badRequest().build();
    }
    disco.setId(id);
    return ResponseEntity.ok(discoRepository.save(disco));
  }

  public ResponseEntity<Disco> excluirDisco(long id){
    if (discoRepository.findById(id).orElse(null) == null) {
      return ResponseEntity.badRequest().build();
    }
    discoRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
