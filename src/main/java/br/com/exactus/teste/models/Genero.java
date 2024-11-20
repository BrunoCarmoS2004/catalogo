package br.com.exactus.teste.models;

public enum Genero {
	//A Ideia de fazer o enum com generos foi 100% minha, mas pedi para o Chat agilizar fazendo os nomes.
	ROCK("Rock"),
    POP("Pop"),
    JAZZ("Jazz"),
    CLASSICA("Clássica"),
    HIPHOP("Hip-Hop"),
    BLUES("Blues"),
    REGGAE("Reggae"),
    METAL("Metal"),
    ELETRONICA("Eletrônica"),
    COUNTRY("Country"),
    SAMBA("Samba"),
    BOSSA_NOVA("Bossa Nova"),
    MPB("Música Popular Brasileira"),
    FUNK("Funk"),
    SERTANEJO("Sertanejo"),
    FORRO("Forró"),
    GOSPEL("Gospel"),
    PAGODE("Pagode"),
    RAP("Rap"),
    KPOP("K-Pop");

    private final String descricao;

    Genero(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
