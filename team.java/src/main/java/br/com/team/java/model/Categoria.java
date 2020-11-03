package br.com.team.java.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.team.java.dto.CategoriaDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "team_categoria")
public class Categoria {

	@Id
	@GeneratedValue ( strategy = GenerationType.SEQUENCE, generator = "team_categoria_seq_id")
	@SequenceGenerator( sequenceName = "team_categoria_seq_id", name = "team_categoria_seq_id", allocationSize = 1)
	private int id;
	private String nome;
	private String descricao;
	
	@OneToMany(mappedBy = "categoria")
	@JsonIgnore
	private List<Produto> produto;
	
	public CategoriaDto toDto() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		CategoriaDto entity = modelMapper.map(this, CategoriaDto.class);
		return entity;
	}
}

