package com.gastoInteligente.gastosCalculadora.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gastoInteligente.gastosCalculadora.model.Usuario;
import com.gastoInteligente.gastosCalculadora.repository.UsuarioRepository;
import com.gastoInteligente.gastosCalculadora.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {
	@Autowired
	private UsuarioRepository repositorio;

	@Override
	public Usuario save(Usuario usuario) {
		return repositorio.save(usuario);
	}

	@Override
	public List<Usuario> findAll() {
		return repositorio.findAll();
	}

	@Override
	public Usuario findById(Integer id) {
		Optional<Usuario> optionalUsuario = repositorio.findById(id);
		return optionalUsuario.orElse(null); // Manejar el caso de que el usuario no se encuentre en la base de datos
	}

	@Override
	public Usuario update(Usuario usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Usuario delete(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Usuario findUsuarioByEmail(String email) {

		return repositorio.findByEmail(email);
	}

	@Override
	public Usuario findByNombre(String nombre) {
		return repositorio.findByNombre(nombre);
	}

	@Override
	public void delete(Usuario nuevoUsuario) {
		repositorio.delete(nuevoUsuario);
	}

}
