package br.com.team.java.dto;

import java.io.Serializable;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.com.team.java.model.ItemVenda;
import br.com.team.java.model.Produto;
import br.com.team.java.model.Venda;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemVendaDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int id;
	private Produto produto;
	@JsonIgnoreProperties("item")
	private Venda venda;
	private int quantidade;

	public ItemVendaDto(ItemVenda itemVenda) {
		this.id = itemVenda.getId();
		this.produto = itemVenda.getProduto();
		this.venda = itemVenda.getVenda();
		this.quantidade = itemVenda.getQuantidade();
	}

	public ItemVenda toEntity() {
		ModelMapper modelMapper = new ModelMapper();
		return modelMapper.map(this, ItemVenda.class);
	}
}
