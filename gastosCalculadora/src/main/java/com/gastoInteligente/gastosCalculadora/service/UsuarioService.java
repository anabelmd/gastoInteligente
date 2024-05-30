package com.gastoInteligente.gastosCalculadora.service;

import java.util.List;

import com.gastoInteligente.gastosCalculadora.model.Usuario;

public interface UsuarioService {
	Usuario save(Usuario usuario);

	List<Usuario> findAll();

	Usuario findById(Integer idUsuario);

	Usuario delete(Integer idUsuario);

	Usuario update(Usuario usuario);

	Usuario findUsuarioByEmail(String email);

	Usuario findByNombre(String nombre);

	void delete(Usuario nuevoUsuario);

}
