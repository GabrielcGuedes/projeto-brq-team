package br.com.team.java.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.team.java.model.Venda;
import br.com.team.java.repository.UsuarioRepository;
import br.com.team.java.repository.VendaRepository;

@Service
public class VendaService {
	@Autowired
	private VendaRepository vendaRepository;
	
	@Autowired
	private UsuarioRepository userRepository;
	
	
	public List<Venda> findAll() {
		return this.vendaRepository.findAll();
	}
	
	public Venda getOne(int id) {
		return this.vendaRepository.findById(id).orElse(new Venda());
				//.orElseThrow( () -> new ObjectNotFoundException("Objeto não encontrado"));
	}
	
	public Venda save(Venda venda) {
		return this.vendaRepository.save(venda);
	}
	
	public Venda update(int id, Venda venda) {
		Optional<Venda> a = this.vendaRepository.findById(id);
		Venda update = null;
		
		if(a.isPresent()) {
			update = a.get();
			
			update.setDataVenda(venda.getDataVenda());
			update.setItem(venda.getItem());
			update.setPagamento(venda.getPagamento());
			update.setParcela(venda.getParcela());
			update.setStatusVenda(venda.getStatusVenda());
			update.setTotalItens(venda.getTotalItens());
			update.setUsuario(venda.getUsuario());
			update.setValor(venda.getValor());
			update.setValorParcela(venda.getValorParcela());
			
			update = this.vendaRepository.save(update);
		}
		return update;
	}
	
	public void delete(int id) {
		this.vendaRepository.deleteById(id);
	}
}
