package br.com.team.java.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.team.java.dto.CategoriaDto;
import br.com.team.java.model.Categoria;
import br.com.team.java.service.CategoriaService;

@RestController
@RequestMapping(value = "categoria")
public class CategoriaController {

	@Autowired
	private CategoriaService categoriaService;

	@GetMapping
	public ResponseEntity<List<CategoriaDto>> findAll() {
		List<Categoria> list = this.categoriaService.findAll();
		List<CategoriaDto> listDto = list.stream().map(objeto -> new CategoriaDto(objeto))
				.collect(Collectors.toList());

		return ResponseEntity.ok().body(listDto);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<CategoriaDto> getOne(@PathVariable int id) {
		Categoria categoria = this.categoriaService.getOne(id);
		CategoriaDto CategoriaDto = new CategoriaDto(categoria);
		return ResponseEntity.ok().body(CategoriaDto);
	}

	@PostMapping
	public ResponseEntity<CategoriaDto> save(@RequestBody CategoriaDto categoriaDto) {
		Categoria categoria = this.categoriaService.save(categoriaDto);
		CategoriaDto CategoriaDto = categoria.toDto();
		return ResponseEntity.ok().body(CategoriaDto);
	}
	
	
	
	

	@PatchMapping(value = "/{id}")
	public ResponseEntity<CategoriaDto> update(@RequestBody CategoriaDto categoriaDto, @PathVariable int id) {
		Categoria categoria = this.categoriaService.update(id, categoriaDto);
		CategoriaDto CategoriaDTO = categoria.toDto();
		return ResponseEntity.ok().body(CategoriaDTO);
	}
	

	@DeleteMapping(value = "/{id}")
	public void delete(@PathVariable int id) {
		this.categoriaService.delete(id);
	}

	@GetMapping(value = "/pagination")
	public ResponseEntity<Page<CategoriaDto>> paginacao(@RequestParam(value = "pagina", defaultValue = "5") int pagina,
			@RequestParam(value = "linhas", defaultValue = "5") int linhas,
			@RequestParam(value = "busca", defaultValue = "") String busca) {
		Page<CategoriaDto> page = this.categoriaService.pagination(pagina, linhas, busca);
		return ResponseEntity.ok().body(page);
	}

}
