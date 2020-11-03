package br.com.team.java.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.team.java.dto.UsuarioDto;
import br.com.team.java.dto.UsuarioSenhaDto;
import br.com.team.java.model.Usuario;
import br.com.team.java.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	public UsuarioRepository usuarioRepository;

	@Autowired
	public BCryptPasswordEncoder bCryptPasswordEncoder;

	public Usuario salvarUsuario(UsuarioSenhaDto usuario) {
		Usuario user = usuario.toEntity();
		user.setSenha(bCryptPasswordEncoder.encode(user.getSenha()));
		return this.usuarioRepository.save(user);
	}

	public Usuario consultarUsuarioId(int id) {
		return this.usuarioRepository.findById(id).orElse(null);
	}

	public List<Usuario> consultarTodosUsuarios() {
		return this.usuarioRepository.findAll();
	}

	public void delete(int id) {
		this.usuarioRepository.deleteById(id);
	}

	public Usuario atualizarUsuario(int id, UsuarioSenhaDto usuario) {
		Optional<Usuario> obj = this.usuarioRepository.findById(id);
		Usuario update = null;

		if (obj.isPresent()) {
			update = obj.get();
			update.setEmail(usuario.getEmail());
			update.setNome(usuario.getNome());
			if (usuario.getSenha() != null) {
				update.setSenha(usuario.getSenha());
				update.setPerfis(usuario.getPerfis());
			}
		}

		return this.usuarioRepository.save(update);
	}

	public Page<UsuarioDto> paginacaoLike(int pagina, int linhas, String nome) {
		PageRequest pageRequest = PageRequest.of(pagina, linhas);
		Page<Usuario> entities = this.usuarioRepository.findByNomeContainsIgnoreCase(nome, pageRequest);
		Page<UsuarioDto> dtoPage = entities.map(new Function<Usuario, UsuarioDto>() {
			@Override
			public UsuarioDto apply(Usuario entity) {
				return new UsuarioDto(entity);
			}
		});

		return dtoPage;
	}

}
