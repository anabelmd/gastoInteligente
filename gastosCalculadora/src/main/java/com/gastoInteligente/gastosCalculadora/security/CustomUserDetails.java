package com.gastoInteligente.gastosCalculadora.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.gastoInteligente.gastosCalculadora.model.Usuario;
import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

	private Usuario usuario;

	public CustomUserDetails(Usuario usuario) {
		this.usuario = usuario;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// Aquí puedes devolver los roles o authorities del usuario, si los tienes
		return Collections.emptyList();
	}

	@Override
	public String getPassword() {
		return usuario.getPassword();
	}

	@Override
	public String getUsername() {
		return usuario.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
