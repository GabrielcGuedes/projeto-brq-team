package br.com.team.java.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.team.java.dto.ItemVendaDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "team_item_venda")
public class ItemVenda implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TEAM_ITEM_NAME_SEQ")
	@SequenceGenerator(sequenceName = "team_item_seq", allocationSize = 1, name = "TEAM_ITEM_NAME_SEQ")
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "produto_id")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "venda_id")
	@JsonIgnore
	private Venda venda;
	
	@Column(name = "quantidade")
	private int quantidade;
	
	public ItemVendaDto toDto() {
		ModelMapper modelMapper = new ModelMapper();
		// user here is a prepopulated User instance
		ItemVendaDto entity = modelMapper.map(this, ItemVendaDto.class);
		return entity;
	}
}
