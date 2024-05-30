package com.gastoInteligente.gastosCalculadora.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "movimientos")
public class Movimientos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Integer idMovimiento;

	@Column(nullable = false)
	private double cantidad;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idUsuario") // idUsuario es el nombre de la variable con la que mapeo en la clase Usuario
	private Usuario usuario;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idCategoria")
	private CategoriaGastos categoria;

	@Column(nullable = false)
	private Date fecha; // Nuevo campo para la fecha

	public Movimientos(double cantidad, Usuario usuario, CategoriaGastos categoria) {
		super();
		this.cantidad = cantidad;
		this.usuario = usuario;
		this.categoria = categoria;

	}

	public Movimientos(CategoriaGastos categoria, double cantidad, Date fecha) {
		this.cantidad = cantidad;
		this.categoria = categoria;
		this.fecha = fecha;

	}

	public Movimientos() {
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Integer getIdMovimiento() {
		return idMovimiento;
	}

	public void setIdMovimiento(Integer idMovimiento) {
		this.idMovimiento = idMovimiento;
	}

	public double getCantidad() {
		return cantidad;
	}

	public void setCantidad(double cantidad) {
		this.cantidad = cantidad;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public CategoriaGastos getCategoria() {
		return categoria;
	}

	public void setCategoria(CategoriaGastos categoria) {
		this.categoria = categoria;
	}

}
