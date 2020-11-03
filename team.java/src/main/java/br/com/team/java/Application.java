package br.com.team.java;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.team.java.model.Categoria;
import br.com.team.java.model.Produto;
import br.com.team.java.model.Usuario;
import br.com.team.java.repository.CategoriaRepository;
import br.com.team.java.repository.ProdutoRepository;
import br.com.team.java.model.enums.Perfil;
import br.com.team.java.repository.UsuarioRepository;

@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	public UsuarioRepository usuarioRepository;

	@Autowired
	public ProdutoRepository produtoRepository;
	
	@Autowired
	public CategoriaRepository categoriaRepository;

	
	@Autowired
	public BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Produto p = Produto.builder().nome("Bola").preco(10).build();
		this.produtoRepository.save(p);

		p = Produto.builder().nome("Boneca").preco(30).build();
		this.produtoRepository.save(p);
		
		Categoria a = Categoria.builder().nome("Carro").descricao("anda").build();
		this.categoriaRepository.save(a);
		
		Usuario u2 = Usuario.builder()
					.nome("Admin")
					.email("admin@admin.com")
					.senha( this.bCryptPasswordEncoder.encode("admin") )
					.build();

		u2.addPerfil(Perfil.ADMIN);		
		this.usuarioRepository.save(u2);
		
		Usuario c = Usuario.builder()
				.nome("Cliente 1")
				.email("cliente@cliente.com")
				.senha( this.bCryptPasswordEncoder.encode("cliente") )
				.build();

	c.addPerfil(Perfil.CLIENTE);		
	this.usuarioRepository.save(c);
		
		
	
	
	}
}