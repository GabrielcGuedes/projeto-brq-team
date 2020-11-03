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

import br.com.team.java.dto.EnderecoDto;
import br.com.team.java.model.Endereco;
import br.com.team.java.service.EnderecoService;

@RestController
@RequestMapping("enderecos")
public class EnderecoController {
	@Autowired
	private EnderecoService enderecoService;

	@GetMapping 
	public ResponseEntity <List<EnderecoDto>> consultarEnderecos(){
		List<Endereco> list = this.enderecoService.consultarEnderecos();
		List<EnderecoDto> listDTO = list.stream().map(objeto -> new EnderecoDto(objeto)  ).collect(Collectors.toList());		
		
		return ResponseEntity.ok().body(listDTO);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<EnderecoDto> consultarEnderecoId(@PathVariable int id) {
		Endereco endereco = this.enderecoService.consultarEnderecoId(id);
		EnderecoDto enderecoDto = new EnderecoDto(endereco);
		return ResponseEntity.ok().body(enderecoDto);
	}
	
	@PostMapping
	public ResponseEntity<EnderecoDto> inserirEndereco(@RequestBody EnderecoDto endereco) {
		Endereco end =  this.enderecoService.inserirEndereco(endereco);
		EnderecoDto endDto = end.toDto();
		return ResponseEntity.ok().body(endDto);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<EnderecoDto> alterarEndereco(@PathVariable int id, @RequestBody EnderecoDto endereco) {
		this.enderecoService.alterarEndereco(id, endereco);
		return ResponseEntity.ok().body(endereco);
	}

	@DeleteMapping("/{id}")
	public void deletarEndereco(@PathVariable int id) {
		this.enderecoService.deletarEndereco(id);
	}
}
