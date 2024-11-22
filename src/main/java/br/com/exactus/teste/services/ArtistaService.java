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
public class ArtistaService {
	@Autowired
	private ArtistasRepository artistasRepository;
	@Autowired
	private DiscoRepository discoRepository;

	public ResponseEntity<List<Artista>> listarArtistas() {
		return ResponseEntity.ok(artistasRepository.findAll());
	}

	public ResponseEntity<Artista> listarPorId(long id) {
		Artista artista = artistasRepository.findById(id).orElse(null);
		if (artista == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(artista);
	}

	public ResponseEntity<Artista> criarArtista(Artista artista) {
		if (artista == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(artistasRepository.save(artista));
	}

	public ResponseEntity<Artista> atualizarArtista(Artista artista, long id) {
		if (artistasRepository.findById(id).orElse(null) == null) {
			return ResponseEntity.badRequest().build();
		}
		artista.setId(id);
		return ResponseEntity.ok(artistasRepository.save(artista));
	}

	public ResponseEntity<Artista> excluirArtista(long id) {
		if (artistasRepository.findById(id).orElse(null) == null) {
			return ResponseEntity.badRequest().build();
		}
		artistasRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	public ResponseEntity<List<Artista>> buscarPorNome(String nome) {
		nome = "%" + nome + "%";
		return ResponseEntity.ok(artistasRepository.findByNomeLike(nome));
	}

	public ResponseEntity<List<Artista>> buscarPorGenero(Genero genero) {
		return ResponseEntity.ok(artistasRepository.findAllByGeneros(genero));
	}

	public ResponseEntity<?> vincularDisco(long artistaId, long discoId) {
		Artista artista = artistasRepository.findById(artistaId).orElse(null);
		Disco disco = discoRepository.findById(discoId).orElse(null);
		if (artista == null || disco == null) {
			return ResponseEntity.badRequest().build();
		}
		if (disco.getArtistaId() == artistaId) {
			return ResponseEntity.ok().build();
		}else if (disco.getArtistaId() != 0) {
			return ResponseEntity.badRequest().build();
		}
		disco.setArtistaId(artistaId);
		artista.setQtdDiscos(artista.getQtdDiscos() + 1);
		artistasRepository.save(artista);
		discoRepository.save(disco);
		return ResponseEntity.ok().build();
	}
}
