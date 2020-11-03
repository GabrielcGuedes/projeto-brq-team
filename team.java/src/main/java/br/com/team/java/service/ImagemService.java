package br.com.team.java.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.com.team.java.dto.ImagemDto;
import br.com.team.java.model.Imagem;
import br.com.team.java.repository.ImagemRepository;

@Service
public class ImagemService {

	@Autowired
	private ImagemRepository imagemRepository;

	public void delete(int id) {
		this.imagemRepository.deleteById(id);
	}

	public Imagem save(ImagemDto imagemDto) {
		Imagem imagem = imagemDto.toEntity();
		return this.imagemRepository.save(imagem);
	}
		

	public List<Imagem> getAll() {
		return this.imagemRepository.findAll();
	}
	
	public Imagem getOne() {
		List<Imagem> l = this.imagemRepository.findAll();
		Imagem i = null;
		if (l.size()>0) {
			i = l.get(0);
		}
		return i;
	}
	
	public Imagem getOneById(int id) {
		return this.imagemRepository.findById(id).orElse(new Imagem());
	}

	public Imagem atualizarImagem(ImagemDto imagemDto, int id) {
		
		Imagem imagem = imagemDto.toEntity();
		
		Optional<Imagem> imagemBuscada = imagemRepository.findById(id);
		Imagem novaImagem = null;

		if (imagemBuscada.isPresent()) {
			novaImagem = imagemBuscada.get();

			novaImagem.setUrl(imagem.getUrl());
			novaImagem.setNome(imagem.getNome());
			novaImagem.setProduto(imagem.getProduto());

			novaImagem = imagemRepository.save(novaImagem);
		}
		return novaImagem;
	}
	
	public Page<Imagem> paginacao(int pagina, int linhas, String busca) {
		PageRequest pageRequest = PageRequest.of(pagina, linhas);
		return this.imagemRepository.findByNomeContainsIgnoreCase(busca, pageRequest);
	}
}
