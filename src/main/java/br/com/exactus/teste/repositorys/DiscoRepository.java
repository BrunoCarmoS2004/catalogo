package br.com.exactus.teste.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.exactus.teste.models.Disco;

public interface DiscoRepository extends JpaRepository<Disco, Long>{
  
}
