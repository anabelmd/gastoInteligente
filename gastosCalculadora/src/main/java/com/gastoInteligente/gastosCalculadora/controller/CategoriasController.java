package com.gastoInteligente.gastosCalculadora.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gastoInteligente.gastosCalculadora.model.CategoriaGastos;
import com.gastoInteligente.gastosCalculadora.service.CategoriaService;

@RestController
@RequestMapping({ "/categoriaGastos" })
public class CategoriasController {
	@Autowired
	private CategoriaService servicio;

	// Obtener todas las categorías
	@GetMapping
	public List<CategoriaGastos> listar() {
		return servicio.findAll();
	}
}
