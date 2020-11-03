package br.com.team.java.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.team.java.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
	
	public List<Produto>findByNomeContainsIgnoreCase(String produto);
	
	public Page<Produto> findByNomeContainsIgnoreCase(String nome, Pageable pageable);

}