package com.gastoInteligente.gastosCalculadora.model;

public class FormularioContacto {
	private String nombre;
	private String email;
	private String asunto;
	private String mensaje;

	public FormularioContacto(String nombre, String email, String asunto, String mensaje) {
		this.nombre = nombre;
		this.email = email;
		this.asunto = asunto;
		this.mensaje = mensaje;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAsunto() {
		return asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	@Override
	public String toString() {
		return "FormularioContacto [ nombre=" + nombre + ", email=" + email + ", asunto=" + asunto + ", mensaje="
				+ mensaje + "]";
	}

}
