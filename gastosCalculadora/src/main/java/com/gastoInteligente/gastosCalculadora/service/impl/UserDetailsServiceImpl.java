package com.gastoInteligente.gastosCalculadora.service.impl;

import com.gastoInteligente.gastosCalculadora.model.Usuario;
import com.gastoInteligente.gastosCalculadora.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepository.findByEmail(email);
		if (usuario == null) {
			throw new UsernameNotFoundException("Usuario no encontrado con el email: " + email);
		}
		return org.springframework.security.core.userdetails.User.builder().username(usuario.getEmail())
				.password(usuario.getPassword()).roles("USER").build();
	}
}
