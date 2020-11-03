package br.com.team.java.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.team.java.dto.VendaDto;
import br.com.team.java.model.ItemVenda;
import br.com.team.java.model.Venda;
import br.com.team.java.repository.ItemVendaRepository;
import br.com.team.java.repository.VendaRepository;

@Service
public class VendaService {
	@Autowired
	private VendaRepository vendaRepository;

	@Autowired
	private ItemVendaRepository itemVendaRepository;

	public List<Venda> findAll() {
		return this.vendaRepository.findAll();
	}

	public Venda getOne(int id) {
		return this.vendaRepository.findById(id).orElse(new Venda());
	}
	
	
	public Venda save(VendaDto vendaDto) {
		Venda venda = vendaDto.toEntity();
		Venda vendaSalva = this.vendaRepository.save(venda);
		if (venda.getItem() != null) {
			for (ItemVenda item : venda.getItem()) {
				item.setVenda(vendaSalva);
				itemVendaRepository.save(item);
			}
		}
		return vendaSalva;

	}

	public Venda update(int id, VendaDto vendaDto) {
		Venda venda = vendaDto.toEntity();
		Optional<Venda> a = this.vendaRepository.findById(id);
		Venda update = null;

		if (a.isPresent()) {
			update = a.get();

			update.setItem(venda.getItem());
			update.setPagamento(venda.getPagamento());
			update.setParcela(venda.getParcela());
			update.setStatusVenda(venda.getStatusVenda());
			update.setTotalItens(venda.getTotalItens());
			update.setUsuario(venda.getUsuario());
			update.setValor(venda.getValor());
			update.setFormaPagamento(venda.getFormaPagamento());
			update.setValorParcela(venda.getValorParcela());

			update = this.vendaRepository.save(update);
		}
		return update;
	}

	public void delete(int id) {
		this.vendaRepository.deleteById(id);
	}
}
