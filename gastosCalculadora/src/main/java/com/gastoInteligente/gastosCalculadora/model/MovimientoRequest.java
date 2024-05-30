package com.gastoInteligente.gastosCalculadora.model;

public class MovimientoRequest {
	private double cantidad;
	private int idCategoria;
	private CategoriaGastos categoria;
	private Usuario usuario;

	public CategoriaGastos getCategoria() {
		return categoria;
	}

	public void setCategoria(CategoriaGastos categoria) {
		this.categoria = categoria;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public double getCantidad() {
		return cantidad;
	}

	public void setCantidad(double cantidad) {
		this.cantidad = cantidad;
	}

	public String getEmailUsuario(Usuario usuario) {
		String emailUsuario = usuario.getEmail();
		return emailUsuario;
	}

	public void setEmailUsuario(String emailUsuario) {
		this.usuario.setEmail(emailUsuario);
	}

	public int getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(CategoriaGastos categoria) {
		this.idCategoria = categoria.getIdCategoria();
	}

	public MovimientoRequest(double cantidad, Usuario usuario, CategoriaGastos categoria) {
		super();
		this.cantidad = cantidad;
		this.usuario = usuario;
		this.categoria = categoria;
		this.idCategoria = categoria.getIdCategoria();
	}

	// Constructor, getters y setters
}
