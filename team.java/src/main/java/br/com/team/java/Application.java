package br.com.team.java;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.team.java.model.Usuario;
import br.com.team.java.model.enums.Perfil;
import br.com.team.java.repository.UsuarioRepository;

@SpringBootApplication
public class Application implements CommandLineRunner{
	
	@Autowired
	public UsuarioRepository usuarioRepository;
	
	@Autowired
	public BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		
	
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
		//Usuario u = new Usuario(0,"Usuario 1", "123456", "usuario@usuario.com" );
//		Usuario u = Usuario.builder()
//					.nome("Admin")
//					.email("admin@admin.com")
//					.senha("123456")				
//					.build();			
//			u = this.usuarioRepository.save(u);
		
		
		Usuario u = Usuario.builder()
					.nome("Cliente")
					.email("cliente@hotmail.com")
					.senha( this.bCryptPasswordEncoder.encode("cliente") )
					.build();

		u.addPerfil(Perfil.CLIENTE);		
		u= this.usuarioRepository.save(u);
				
		
	}

}
