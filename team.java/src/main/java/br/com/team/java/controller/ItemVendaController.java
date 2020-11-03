package br.com.team.java.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.team.java.dto.ItemVendaDto;
import br.com.team.java.model.ItemVenda;
import br.com.team.java.service.ItemVendaService;

@RestController
@RequestMapping(value = "venda_item")
public class ItemVendaController {

	@Autowired
	private ItemVendaService itemVendaService;

	@GetMapping
	public ResponseEntity<List<ItemVendaDto>> getAll() {
		List<ItemVenda> list = this.itemVendaService.findAll();
		List<ItemVendaDto> listDTO = list.stream()
									 .map(objeto -> new ItemVendaDto(objeto))
								     .collect(Collectors.toList());
		
		return ResponseEntity.ok().body(listDTO);
	}

	@GetMapping(value = "{id}")
	public ResponseEntity<ItemVendaDto> getOne(@PathVariable int id) {
		ItemVenda v = this.itemVendaService.getOne(id);
		ItemVendaDto itemVendaDto = new ItemVendaDto(v);
		return ResponseEntity.ok().body(itemVendaDto);
	}

	@PostMapping
	public ResponseEntity<ItemVendaDto> save(@RequestBody ItemVendaDto itemVenda) {
		ItemVenda v = this.itemVendaService.save(itemVenda);
		ItemVendaDto itemVendaDto = new ItemVendaDto(v);
		return ResponseEntity.ok().body(itemVendaDto);
	}

	@PatchMapping(value = "{id}")
	public ResponseEntity<ItemVendaDto> update(@RequestBody ItemVendaDto itemVenda, @PathVariable int id) {
		ItemVenda v = this.itemVendaService.update(id, itemVenda);
		ItemVendaDto itemVendaDto = new ItemVendaDto(v);
		return ResponseEntity.ok().body(itemVendaDto);
	}

	@DeleteMapping(value = "{id}")
	public void delete(@PathVariable int id) {
		this.itemVendaService.delete(id);
	}

}
