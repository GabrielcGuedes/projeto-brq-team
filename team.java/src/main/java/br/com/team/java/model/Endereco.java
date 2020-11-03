package br.com.team.java.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.com.team.java.dto.EnderecoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "team_endereco")
public class Endereco {
	
	
	@Id
	@GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "endereco_id_seq")
	@SequenceGenerator( name = "endereco_id_seq", sequenceName = "endereco_id_seq",allocationSize = 1)
	private int id;
	
	private String logradouro;
	private String numero;
	private String bairro;
	private String cep;
	private String estado;
	private String cidade;
	
	@OneToOne(mappedBy = "endereco")
	@JsonIgnoreProperties("endereco")
	private Usuario usuario;
	
	public EnderecoDto toDto() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		EnderecoDto entity = modelMapper.map(this, EnderecoDto.class);
		return entity;
	}
	
}
