package com.gastoInteligente.gastosCalculadora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gastoInteligente.gastosCalculadora.model.Movimientos;

public interface MovimientosRepository extends JpaRepository<Movimientos, Integer>{
	 List<Movimientos> findByUsuario_Email(String email);

}
