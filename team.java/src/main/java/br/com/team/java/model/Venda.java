package br.com.team.java.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.team.java.dto.VendaDto;
import br.com.team.java.model.enums.StatusPagamento;
import br.com.team.java.model.enums.StatusVenda;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "team_venda")
public class Venda implements Serializable {

	private static final long serialVersionUID = 1L;

	// Atributos
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VENDAS_NAME_SEQ")
	@SequenceGenerator(sequenceName = "vendas_seq", allocationSize = 1, name = "VENDAS_NAME_SEQ")
	private int id;

	@Column(name = "valor")
	private double valor;

	@OneToMany(mappedBy = "venda", cascade = CascadeType.ALL, orphanRemoval = true)
	List<ItemVenda> item;

	@ManyToOne
	private Usuario usuario;

	@DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date dataVenda = new Date(System.currentTimeMillis());
	private StatusVenda statusVenda;
	
	private String formaPagamento;

	private int totalItens;

	private StatusPagamento pagamento;

	@Column(name = "parcela")
	private int parcela;

	@Column(name = "valorParcela")
	private double valorParcela;

	
	public VendaDto toDto() {
		ModelMapper modelMapper = new ModelMapper();
		VendaDto entity = modelMapper.map(this, VendaDto.class);
		return entity;
	}
}
