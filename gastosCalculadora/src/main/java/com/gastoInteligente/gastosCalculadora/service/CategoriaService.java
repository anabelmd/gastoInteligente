package com.gastoInteligente.gastosCalculadora.service;

import java.util.List;

import com.gastoInteligente.gastosCalculadora.model.CategoriaGastos;

public interface CategoriaService {

	List<CategoriaGastos> findAll();

	CategoriaGastos findById(Integer idCategoria);
}
