  
package br.com.team.java.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.team.java.dto.UsuarioSenhaDto;
import br.com.team.java.model.Usuario;


// Authorization - Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

@RestController
@RequestMapping (value = "autenticacao")
public class AutenticacaoController {
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping (value = "")
	public AuthToken autenticacao( @RequestBody UsuarioSenhaDto usuario  ) {
		
		//System.out.println( "EMAIL : " + usuario.getEmail() + " " + "SENHA : " + usuario.getSenha() );

		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getSenha() ));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);

		/* final String token = jwtTokenUtil.generateToken(authentication); */

		int id = ((CredencialSecurityModel) authentication.getPrincipal()).getId();
		String username = ((CredencialSecurityModel) authentication.getPrincipal()).getUsername();
		String nome = ((CredencialSecurityModel) authentication.getPrincipal()).getNome();
		// String authorities = CredendialService.getAuthorityToString(authentication);
		String authorities = ((CredencialSecurityModel) authentication.getPrincipal()).getAuthorityToString();
		
		final String token = jwtUtil.generateToken(id,username, nome, authorities);

		AuthToken myToken = new AuthToken(token);
		
		return myToken;

	}
}