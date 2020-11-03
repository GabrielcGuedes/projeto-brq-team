package br.com.team.java.dto;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.com.team.java.model.Endereco;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnderecoDto {
	
	private int id;
	private String logradouro;
	private String numero;
	private String bairro;
	private String cep;
	private String estado;
	private String cidade;
	@JsonIgnoreProperties("endereco")
	private UsuarioDto usuarioDto;
	
	public EnderecoDto ( Endereco endereco ) {
		this.id = endereco.getId();
		this.logradouro = endereco.getLogradouro();
		this.numero = endereco.getNumero();
		this.bairro = endereco.getBairro();
		this.cep = endereco.getCep();
		this.estado = endereco.getEstado();
		this.cidade = endereco.getCidade();
		UsuarioDto userDto = endereco.getUsuario().toDto();
		this.usuarioDto = userDto;
 
	}
	
	
	public Endereco toEntity() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		Endereco entity = modelMapper.map(this, Endereco.class);
		return entity;
	}
}
