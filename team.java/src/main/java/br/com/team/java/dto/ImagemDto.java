package br.com.team.java.dto;

import org.modelmapper.ModelMapper;

import br.com.team.java.model.Imagem;
import br.com.team.java.model.Produto;
import lombok.Data;

@Data
public class ImagemDto {
	
	
	private int id;
	private String url;
	private String nome;
	private Produto produto;

	
//	public ImagemDto(Imagem imagem) {
//		
//		this.id = imagem.getId();
//		this.url = imagem.getUrl();
//		this.nome = imagem.getNome();
//		this.produto = imagem.getProduto();
//		
//	}
//	
	
	public Imagem toEntity() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		Imagem entity = modelMapper.map(this, Imagem.class);
		return entity;
	}
	
	
}


