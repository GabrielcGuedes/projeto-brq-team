package br.com.team.java.util;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import br.com.team.java.dto.CategoriaDto;
import br.com.team.java.dto.EnderecoDto;
import br.com.team.java.dto.ImagemDto;
import br.com.team.java.dto.UsuarioDto;
import br.com.team.java.dto.UsuarioNewDto;
import br.com.team.java.model.Categoria;
import br.com.team.java.model.Endereco;
import br.com.team.java.model.Imagem;
import br.com.team.java.model.Usuario;

public class DtoUtil {
	@Autowired
	private static ModelMapper modelMapper;

	public static Usuario usuarioFromDto(UsuarioDto objDto) {
		return Usuario.builder().id(objDto.getId()).nome(objDto.getNome()).email(objDto.getEmail()).build();
	}

	public static Imagem imagemProdFromDto(ImagemDto obj) {
		return new Imagem(
				obj.getId(), 
				obj.getUrl(), 				
				obj.getNome(), 
				obj.getProduto()
				);
	}

	public static Usuario usuarioNewFromDto(UsuarioNewDto objDto) {
		return Usuario.builder().id(objDto.getId()).email(objDto.getEmail()).senha(objDto.getSenha())
				.nome(objDto.getNome()).build();
	}

	public static Endereco enderecoUsuarioFromDto(EnderecoDto objDto) {
		return Endereco.builder().id(objDto.getId()).cep(objDto.getCep()).bairro(objDto.getBairro())
				.cidade(objDto.getCidade()).estado(objDto.getEstado()).logradouro(objDto.getLogradouro())
				.numero(objDto.getNumero()).build();
	}

	public static Categoria categoriaFromDto(CategoriaDto obj) {
		return new Categoria(obj.getId(), obj.getNome(), obj.getDescricao(), null);
	}
	
	public static Imagem imagemFromDto(ImagemDto obj) {
		return new Imagem(obj.getId() , obj.getUrl(), obj.getNome(), null);
	}

	public static <D, T> Page<D> mapEntityPageIntoDtoPage(Page<T> entities, Class<D> dtoClass) {

		return entities.map(objectEntity -> modelMapper.map(objectEntity, dtoClass));
	}
	
	private DtoUtil() {}
}
