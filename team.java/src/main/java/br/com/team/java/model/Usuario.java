package br.com.team.java.model;


import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.com.team.java.dto.UsuarioDto;
import br.com.team.java.dto.UsuarioSenhaDto;
import br.com.team.java.model.enums.Perfil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "team_usuario")
@Entity
public class Usuario {
	
	@Id
	@GeneratedValue ( strategy = GenerationType.SEQUENCE, generator = "usuario_seq_id" )
	@SequenceGenerator ( sequenceName = "usuario_seq_id", name = "usuario_seq_id", allocationSize = 1 )
	private int id;
	
	private String nome;
	
	private String email;
	
	private String senha;
	
	//Endereço
	
	@OneToOne
	@JsonIgnoreProperties("usuario")
	@JoinColumn ( name = "endereco_id" )
	private Endereco endereco;
	
	//Perfil
	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "PERFIS")
	private Set<Integer> perfis = new HashSet<>();
	
	public Set<Perfil> getPerfisSetList() {
		return perfis.stream().map(x -> Perfil.toEnum(x)).collect(Collectors.toSet());
	}
	
	public void addPerfil(Perfil perfil) {
		if (perfis == null) {
			perfis = new HashSet<>();
		}
		
		perfis.add( perfil.getCodigo() );
	}
	
	public UsuarioDto toDto() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		UsuarioDto entity = modelMapper.map(this, UsuarioDto.class);
		return entity;
	}
	
	public UsuarioSenhaDto toSenhaDto() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		UsuarioSenhaDto entity = modelMapper.map(this, UsuarioSenhaDto.class);
		return entity;
	}
}
