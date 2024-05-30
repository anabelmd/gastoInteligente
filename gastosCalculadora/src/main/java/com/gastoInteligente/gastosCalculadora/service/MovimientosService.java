package com.gastoInteligente.gastosCalculadora.service;

import java.util.List;

import com.gastoInteligente.gastosCalculadora.model.Movimientos;

public interface MovimientosService {

	void guardarMovimiento(Movimientos movimiento);

	Movimientos findById(Integer id);

	List<Movimientos> findAll();

	void eliminarMovimientoPorId(Integer idMovimiento);

	List<Movimientos> obtenerMovimientosPorUsuario(String email);

	Movimientos actualizarMovimiento(Integer idMovimiento, Movimientos movimiento);
}
