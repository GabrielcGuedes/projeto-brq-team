package br.com.team.java.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.team.java.model.Imagem;

@Repository
public interface ImagemRepository extends JpaRepository<Imagem, Integer> {
	
	public Page<Imagem> findByNomeContainsIgnoreCase(String nome, Pageable pageable);


}
