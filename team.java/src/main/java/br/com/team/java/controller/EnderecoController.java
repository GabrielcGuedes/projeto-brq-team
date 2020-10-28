package br.com.team.java.controller;

import java.util.List;
import java.util.Optional;
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
import br.com.team.java.dto.UsuarioDto;
import br.com.team.java.model.Endereco;
import br.com.team.java.model.Usuario;
import br.com.team.java.service.EnderecoService;
import br.com.team.java.util.DtoUtil;

@RestController
@RequestMapping("enderecos")
public class EnderecoController {

	@Autowired
	private EnderecoService enderecoService;

	
//	@GetMapping
//	public List<Endereco> consultarEnderecos() {
//		return this.enderecoService.consultarEnderecos();
//	}
	
	@GetMapping 
	public ResponseEntity <List<EnderecoDto>> consultarEnderecos(){
		List<Endereco> list = this.enderecoService.consultarEnderecos();
		List<EnderecoDto> listDTO = list.stream().map( (objeto) -> new EnderecoDto(objeto)  ).collect(Collectors.toList());		
		
		return ResponseEntity.ok().body(listDTO);
	}
	
	
	@GetMapping("/{id}")
	public Optional<Endereco> consultarEnderecoId(@PathVariable int id) {
		return this.enderecoService.consultarEnderecoId(id);
	}
	
	@PostMapping
	public Endereco inserirEndereco(@RequestBody EnderecoDto endereco) {
		return DtoUtil.enderecoUsuarioFromDto(endereco);
		
	}
	
	@PatchMapping("/{id}")
	public Endereco alterarEndereco(@PathVariable int id, @RequestBody Endereco endereco) {
		return this.enderecoService.alterarEndereco(id, endereco);
	}

	@DeleteMapping("/{id}")
	public void deletarEndereco(@PathVariable int id) {
		this.enderecoService.deletarEndereco(id);
	}
}
