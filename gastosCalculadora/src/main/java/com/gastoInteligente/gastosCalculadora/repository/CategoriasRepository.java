package com.gastoInteligente.gastosCalculadora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gastoInteligente.gastosCalculadora.model.CategoriaGastos;

public interface CategoriasRepository extends JpaRepository<CategoriaGastos, Integer> {

}
