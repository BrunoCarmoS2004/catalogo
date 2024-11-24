package br.com.exactus.teste.models;

import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Disco {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String titulo;
	
	private String anoLancamento;
	@Lob
	private String capa;
	
	@ElementCollection
    private Set<Genero> generos;
	
	@OneToMany(mappedBy = "discoId", cascade = CascadeType.ALL)
	private List<Musica> musicas;
	
	private int qtdMusicas = 0;

	private long artistaId = 0;
	}
