package br.com.exactus.teste.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.exactus.teste.models.Artista;

public interface ArtistasRepository extends JpaRepository<Artista, Long>{
  
}
