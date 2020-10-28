package br.com.team.java.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.validator.constraints.Length;

import br.com.team.java.model.Usuario;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioNewDto {

	private int id;
	
	@NotEmpty(message="Preenchimento obrigatório")
	@Length(min=5, max=120, message="O tamanho deve ser entre 5 e 120 caracteres")
	private String nome;
	
	@NotEmpty(message="Preenchimento obrigatório")
	@Email(message="Email inválido")
	private String email; 
	
	@NotEmpty(message="Preenchimento obrigatório")
	private String senha;	
	
	private EnderecoDto endereco;
	
	public UsuarioNewDto ( Usuario usuario ) {
		this.id = usuario.getId();
		this.nome = usuario.getNome();
		this.email = usuario.getEmail();
		this.endereco = new EnderecoDto( usuario.getEndereco() ) ;
	}
	
}