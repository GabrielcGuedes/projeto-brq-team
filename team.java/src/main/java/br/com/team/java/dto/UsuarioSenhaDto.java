package br.com.team.java.dto;

import java.util.HashSet;
import java.util.Set;
import org.modelmapper.ModelMapper;
import br.com.team.java.model.Endereco;
import br.com.team.java.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioSenhaDto {

	private int id;
	private String nome;
	private String email;
	private Endereco endereco;
	private String senha;
	private Set<Integer> perfis = new HashSet<>();

//	public UsuarioSenhaDto(Usuario usuario) {
//		this.id = usuario.getId();
//		this.nome = usuario.getNome();
//		this.email = usuario.getEmail();
//		this.endereco = usuario.getEndereco();
//		this.perfis = usuario.getPerfis();
//		this.senha = usuario.getSenha();
//	}

	public Usuario toEntity() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		Usuario entity = modelMapper.map(this, Usuario.class);
		return entity;
	}

//		public Usuario transformaParaObjeto(){
//			//int senha = null;
//		    return new Usuario(id, nome, email, endereco, null, null);
//		}
}