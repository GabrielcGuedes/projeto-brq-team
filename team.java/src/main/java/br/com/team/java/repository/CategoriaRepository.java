package br.com.team.java.repository;


import org.springframework.stereotype.Repository;

import br.com.team.java.model.Categoria;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

	@Query("SELECT a FROM Categoria a WHERE a.nome like %:nome%")
	public List<Categoria> procurarPorNome(String nome);
	
	public Page<Categoria> findByNomeContainsIgnoreCase(String nome, Pageable pageable);
}
