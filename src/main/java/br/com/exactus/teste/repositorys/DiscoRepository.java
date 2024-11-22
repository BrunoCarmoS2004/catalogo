package br.com.exactus.teste.repositorys;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.exactus.teste.models.Disco;
import br.com.exactus.teste.models.Genero;

public interface DiscoRepository extends JpaRepository<Disco, Long>{
  List<Disco>findByArtistaId(long artistaId);
  List<Disco> findByTituloLike(String titulo);
  List<Disco>findAllByGeneros(Genero generos);
}
