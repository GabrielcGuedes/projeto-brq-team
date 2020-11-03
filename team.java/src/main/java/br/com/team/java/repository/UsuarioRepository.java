package br.com.team.java.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.team.java.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	
	public Usuario findByEmail(String email);
	
	public Page<Usuario> findByNomeContainsIgnoreCase(String nome,Pageable pageable);
}
