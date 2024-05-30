package com.gastoInteligente.gastosCalculadora.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categoria_gastos")
public class CategoriaGastos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Integer idCategoria;

	// En la base de datos no puede estar asi nombreCategoria, tiene que estar asi
	// nombre_categoria
	/* @Column(name = "nombre_categoria", nullable = false) */
	private String nombreCategoria;

	@Column(name = "tipo_gasto", nullable = false)
	private int tipoGasto;

	@JsonIgnore
	@OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
	private List<Movimientos> movimientos = new ArrayList<>();

	public CategoriaGastos(Integer idCategoria, String nombreCategoria, int tipoGasto) {
		super();
		this.idCategoria = idCategoria;
		this.nombreCategoria = nombreCategoria;
		this.tipoGasto = tipoGasto;
	}

	public CategoriaGastos(Integer idCategoria) {
		super();
		this.idCategoria = idCategoria;
	}

	public List<Movimientos> getMovimientos() {
		return movimientos;
	}

	public void setMovimientos(List<Movimientos> movimientos) {
		this.movimientos = movimientos;
	}

	// A la fuerza debe haber un constructor por defecto, si no da pete
	public CategoriaGastos() {
	}

	public Integer getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Integer idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNombreCategoria() {
		return nombreCategoria;
	}

	public void setNombreCategoria(String nombreCategoria) {
		this.nombreCategoria = nombreCategoria;
	}

	public int getTipoGasto() {
		return tipoGasto;
	}

	public void setTipoGasto(int tipoGasto) {
		this.tipoGasto = tipoGasto;
	}

	@Override
	public String toString() {
		return "CategoriaGastos [idCategoria=" + idCategoria + ", nombreCategoria=" + nombreCategoria + ", tipoGasto="
				+ tipoGasto + "]";
	}

}
