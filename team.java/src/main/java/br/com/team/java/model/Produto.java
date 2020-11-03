package br.com.team.java.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.team.java.dto.ProdutoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "team_produto")
public class Produto {
	
	@Id
	@GeneratedValue (strategy = GenerationType.SEQUENCE, generator = "team_produto_seq_id")
	@SequenceGenerator (name = "team_produto_seq_id", sequenceName = "team_produto_seq_id", allocationSize = 1)
	private int id;
	private String nome;
	private String descricao;
	private double preco;
	
	@ManyToOne
	@JoinColumn (name ="categoria_id")
	private Categoria categoria;
	
	@ManyToMany
	@JoinTable( name = "produto_imagem",
		joinColumns = @JoinColumn(name="produto_id"),
		inverseJoinColumns = @JoinColumn(name="imagem_id"))		
	private List<Imagem> imagens;
	
	
	@OneToMany(mappedBy = "produto")
	@JsonIgnore
	private List<ItemVenda> item;
	
	public ProdutoDto toDto() {
		ModelMapper modelMapper = new ModelMapper();
		return modelMapper.map(this, ProdutoDto.class);
	}
}
