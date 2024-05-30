package com.gastoInteligente.gastosCalculadora.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gastoInteligente.gastosCalculadora.model.CategoriaGastos;
import com.gastoInteligente.gastosCalculadora.repository.CategoriasRepository;
import com.gastoInteligente.gastosCalculadora.service.CategoriaService;

@Service
public class CategoriaServiceImpl implements CategoriaService {
	@Autowired
	private CategoriasRepository repositorio;

	@Override
	public List<CategoriaGastos> findAll() {
		return repositorio.findAll();
	}

	@Override
	public CategoriaGastos findById(Integer idCategoria) {
		Optional<CategoriaGastos> optionalCategoria = repositorio.findById(idCategoria);
		return optionalCategoria.orElse(null);
	}
}
