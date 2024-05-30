package com.gastoInteligente.gastosCalculadora.model;

import java.util.Date;

public class MovimientoResponse {

	private Integer idMovimiento;
	private Double cantidad;
	private Date fecha;
	private CategoriaGastos categoriaGastos;
	private Usuario usuario;

	public Integer getIdMovimiento() {
		return idMovimiento;
	}

	public void setIdMovimiento(Integer idMovimiento) {
		this.idMovimiento = idMovimiento;
	}

	public Double getCantidad() {
		return cantidad;
	}

	public void setCantidad(Double cantidad) {
		this.cantidad = cantidad;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public CategoriaGastos getCategoria() {
		return categoriaGastos;
	}

	public void setCategoria(CategoriaGastos categoria) {
		this.categoriaGastos = categoria;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}
