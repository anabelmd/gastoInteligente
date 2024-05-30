package com.gastoInteligente.gastosCalculadora.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gastoInteligente.gastosCalculadora.model.Movimientos;
import com.gastoInteligente.gastosCalculadora.model.Usuario;
import com.gastoInteligente.gastosCalculadora.repository.MovimientosRepository;
import com.gastoInteligente.gastosCalculadora.service.MovimientosService;

@Service
public class MovimientosServiceImpl implements MovimientosService {
    @Autowired
	private MovimientosRepository repositorio;

	@Override
	public void guardarMovimiento(Movimientos movimiento) {

		repositorio.save(movimiento);

	}

	@Override
	public Movimientos findById(Integer id) {
		Optional<Movimientos> optionalMovimiento = repositorio.findById(id);
		return optionalMovimiento.orElse(null);

	}

	@Override
	public List<Movimientos> findAll() {

		return repositorio.findAll();
	}

	public List<Movimientos> obtenerMovimientosPorUsuario(String email) {
		return repositorio.findByUsuario_Email(email);
	}

	@Override
	public void eliminarMovimientoPorId(Integer idMovimiento) {
		repositorio.deleteById(idMovimiento);

	}

	@Override
	public Movimientos actualizarMovimiento(Integer idMovimiento, Movimientos movimiento) {
		Optional<Movimientos> optionalMovimiento = repositorio.findById(idMovimiento);
		if (optionalMovimiento.isPresent()) {
			Movimientos movimientoExistente = optionalMovimiento.get();
			// Actualizar los campos necesarios del movimiento existente con los valores del
			// nuevo movimiento
			movimientoExistente.setCantidad(movimiento.getCantidad());
			movimientoExistente.setFecha(movimiento.getFecha());

			// Actualizar otros campos según sea necesario

			// Guardar el movimiento actualizado en la base de datos
			return repositorio.save(movimientoExistente);
		} else {
			return null; // Devolver null si el movimiento no se encuentra en la base de datos
		}
	}

}
