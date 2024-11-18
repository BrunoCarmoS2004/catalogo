package br.com.exactus.teste.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.exactus.teste.models.Musica;

public interface MusicaRepository extends JpaRepository<Musica, Long>{

  
}