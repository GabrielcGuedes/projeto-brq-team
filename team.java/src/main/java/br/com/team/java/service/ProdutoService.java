package br.com.team.java.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.com.team.java.model.Categoria;
import br.com.team.java.model.Produto;
import br.com.team.java.repository.CategoriaRepository;
import br.com.team.java.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	public List<Produto> getAll(){
		return this.produtoRepository.findAll();
	}

	public Produto getOne(int id) {
		return this.produtoRepository.findById(id).orElse(new Produto());
	}

	public Produto save(Produto produto) {
		if(produto.getCategoria() != null) {
			br.com.team.java.model.Categoria c = this.categoriaRepository.findById(produto.getCategoria().getId())
					.orElse(this.categoriaRepository.save(produto.getCategoria()));
			produto.setCategoria(c);
		}
		return this.produtoRepository.save(produto);
	}

	public Produto update(int id, Produto produto) {
		Optional<Produto> a = this.produtoRepository.findById(id);
		Produto update = null;

		if (a.isPresent()) {
			update = a.get();

			update.setNome(produto.getNome());
			update.setDescricao(produto.getDescricao());
			update.setPreco(produto.getPreco());
			update.setCategoria(produto.getCategoria());
//			update.setImagem(produto.getImagem());
			update = this.produtoRepository.save(update);
		}
		return update;
	}

	public void delete(int id) {
		this.produtoRepository.deleteById(id);
	}

	public List<Produto> findByNomeContainsIgnoreCase(String produto) {
		return this.produtoRepository.findByNomeContainsIgnoreCase(produto);
	}

	public Page<Produto> paginacao(int pagina, int linhas) {
		PageRequest pageRequest = PageRequest.of(pagina, linhas);
		return this.produtoRepository.findAll(pageRequest);
	}

}
