package br.com.team.java.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.team.java.model.Endereco;
import br.com.team.java.model.Usuario;
import br.com.team.java.repository.EnderecoRepository;
import br.com.team.java.repository.UsuarioRepository;

@Service
public class EnderecoService {

	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<Endereco> consultarEnderecos(){
		return this.enderecoRepository.findAll();
	}
	
	public Optional<Endereco> consultarEnderecoId(int id){
		return this.enderecoRepository.findById(id);
	}
	
	public Endereco inserirEndereco(Endereco endereco) {
		if(endereco.getUsuario() != null  && endereco.getUsuario().getId() > 0) {
			Usuario usuario = this.usuarioRepository.findById(endereco.getUsuario().getId()).get();
			this.enderecoRepository.save(endereco);
			usuario.setEndereco(endereco);
			this.usuarioRepository.save(usuario);
	
		}
		return endereco;
	}
	
	public Endereco alterarEndereco(int id,Endereco endereco) {
		Optional<Endereco> enderecoExistente = this.enderecoRepository.findById(id);
		Endereco enderecoAlterado = null;
		
		if(enderecoExistente.isPresent()) {
			enderecoAlterado = enderecoExistente.get();
			enderecoAlterado.setLogradouro(endereco.getLogradouro());
			enderecoAlterado.setBairro(endereco.getBairro());
			enderecoAlterado.setCep(endereco.getCep());
			enderecoAlterado.setCidade(endereco.getCidade());
			enderecoAlterado.setEstado(endereco.getEstado());
			enderecoAlterado.setNumero(endereco.getNumero());
			enderecoAlterado.setUsuario(endereco.getUsuario());
			enderecoAlterado = this.enderecoRepository.save(enderecoAlterado);
		}
		return enderecoAlterado;
	}
	
	public void deletarEndereco(int id) {
		this.enderecoRepository.deleteById(id);
	}
	
}
