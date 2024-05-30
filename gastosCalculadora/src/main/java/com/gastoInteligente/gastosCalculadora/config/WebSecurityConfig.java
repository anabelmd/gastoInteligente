package com.gastoInteligente.gastosCalculadora.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@Order(2)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers(HttpMethod.POST, "/movimientos/crear").permitAll()
				.antMatchers(HttpMethod.POST, "/usuarios/logout").permitAll()// Permitir acceso a la ruta de creación de
																				// movimientos sin autenticación
				.antMatchers(HttpMethod.GET, "/movimientos/*").permitAll()
				.antMatchers(HttpMethod.GET, "/movimientos/listar/{email}").permitAll()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Permitir el acceso a todas las demás rutas para
																	// todos los usuarios
				.anyRequest().authenticated().and().formLogin().permitAll().and().logout().permitAll();
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// Configuración de la autenticación. Aquí puedes configurar tu propio proveedor
		// de autenticación si lo deseas.
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
