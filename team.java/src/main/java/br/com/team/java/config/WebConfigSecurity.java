  
package br.com.team.java.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.team.java.security.CredentialDetailsServiceImpl;
import br.com.team.java.security.JwtAutenticacaoFiltro;
import br.com.team.java.security.JwtAutorizacaoFiltro;
import br.com.team.java.security.JwtUtil;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@EnableWebSecurity
public class WebConfigSecurity extends WebSecurityConfigurerAdapter {
	private static final String[] PUBLIC_ENDPOINT = {
			"/v2/api-docs",
            "/configuration/ui",
            "/swagger-resources/**",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/camel/**",
            "/usuarios/**"
            
	};

	
	private static final String[] PUBLIC_ENDPOINT_GET = {
			"/produto/**", "/csrf", "/", "/categoria/**"
	};
	
	private static final String[] PUBLIC_ENDPOINT_POST = {
			"/autenticacao"	, "/usuarios"
	};
		
	@Autowired
	private CredentialDetailsServiceImpl userDetailsService;
		
	@Autowired
	private JwtUtil jwtUtil;
		
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	@Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
	    
    @Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
    
    @Override
	protected void configure( HttpSecurity http ) throws Exception {
		//http.csrf().disable().authorizeRequests().anyRequest().permitAll();
		http.cors().and().csrf().disable().authorizeRequests()
			.antMatchers(HttpMethod.GET, PUBLIC_ENDPOINT_GET).permitAll()
			.antMatchers(HttpMethod.POST, PUBLIC_ENDPOINT_POST).permitAll()
			.antMatchers(PUBLIC_ENDPOINT).permitAll()
			.anyRequest().authenticated()
			.and()
            //gerenciamenteo de sessão STATELESS
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilter( new JwtAutenticacaoFiltro( authenticationManager(), jwtUtil));
		http.addFilter(new JwtAutorizacaoFiltro(authenticationManager() , jwtUtil, userDetailsService));
	}
}