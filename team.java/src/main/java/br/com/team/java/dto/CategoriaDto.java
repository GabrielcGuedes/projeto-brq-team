package br.com.team.java.dto;

import java.io.Serializable;

import java.util.List;

import org.modelmapper.ModelMapper;

import br.com.team.java.model.Categoria;
import br.com.team.java.model.Produto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoriaDto implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private int id;
	private String nome;
	private String descricao;

	public CategoriaDto(Categoria categoria) {
		this.id = categoria.getId();
		this.nome = categoria.getNome();
		this.descricao = categoria.getDescricao();
	}
	
	private List<Produto> produto;
	
	public Categoria toEntity() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		Categoria entity = modelMapper.map(this, Categoria.class);
		return entity;
	}

}