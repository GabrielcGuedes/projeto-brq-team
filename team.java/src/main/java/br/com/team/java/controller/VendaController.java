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

import br.com.team.java.dto.VendaDto;
import br.com.team.java.model.Venda;
import br.com.team.java.service.VendaService;

@RestController
@RequestMapping(value="venda")
public class VendaController {
	
	@Autowired
	private VendaService vendaService;
	
	@GetMapping
	public ResponseEntity<List<VendaDto>> findAll(){
		List<Venda> list = this.vendaService.findAll();
		List<VendaDto> listDTO = list.stream().map(objeto -> objeto.toDto())
				.collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}
	
	
	@GetMapping(value="{id}")
	public ResponseEntity<VendaDto> getOne(@PathVariable int id){
		Venda venda = this.vendaService.getOne(id);
		VendaDto vendaDTO = venda.toDto(); 
		return ResponseEntity.ok().body(vendaDTO);
	}
	
	
	@PostMapping
	public ResponseEntity<VendaDto> save(@RequestBody VendaDto vendaDto){
		Venda v = this.vendaService.save(vendaDto);
		VendaDto vendaDTO = v.toDto();
		return ResponseEntity.ok().body(vendaDTO);
	}
	
	@PatchMapping(value="{id}")
	public ResponseEntity<VendaDto> update(@RequestBody VendaDto venda, @PathVariable int id){
		Venda v = this.vendaService.update(id, venda);
		VendaDto vendaDTO = v.toDto();
		return ResponseEntity.ok().body(vendaDTO);
	}
	
	@DeleteMapping(value="{id}")
	public void delete(@PathVariable int id){
		this.vendaService.delete(id);
		
	}

}
