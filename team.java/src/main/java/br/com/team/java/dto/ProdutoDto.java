package br.com.team.java.dto;

import java.util.List;

import org.modelmapper.ModelMapper;

import br.com.team.java.model.Categoria;
import br.com.team.java.model.Imagem;
import br.com.team.java.model.ItemVenda;
import br.com.team.java.model.Produto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDto {
	private int id;
	private String nome;
	private String descricao;
	private double preco;
	private Categoria categoria;
	private List<Imagem> imagens;
	private List<ItemVenda> item;

	public Produto toEntity() {
		ModelMapper modelMapper = new ModelMapper();
		Produto entity = modelMapper.map(this, Produto.class);
		return entity;
	}
	
}
