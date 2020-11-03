package br.com.team.java.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import br.com.team.java.model.Venda;
import br.com.team.java.model.enums.StatusPagamento;
import br.com.team.java.model.enums.StatusVenda;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VendaDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private int id;
	private double valor;
	@JsonIgnoreProperties("venda")
	private List<ItemVendaDto> item;
	
	private UsuarioDto usuario;
	
	@DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date dataVenda = new Date(System.currentTimeMillis());
	
	private StatusVenda statusVenda;
	private int totalItens;
	private StatusPagamento pagamento;
	private int parcela;

	private double valorParcela;
	


	public Venda toEntity() {
		ModelMapper modelMapper = new ModelMapper();
		Venda entity = modelMapper.map(this, Venda.class);
		return entity;
	}

}
