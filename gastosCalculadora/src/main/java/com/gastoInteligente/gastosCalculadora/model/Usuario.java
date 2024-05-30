package com.gastoInteligente.gastosCalculadora.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idUsuario;
	@Column(nullable = false)
	private String nombre;
	@Column(nullable = false)
	private String password;

	@Column(unique = true, nullable = false)
	private String email;

	// usuario nombre de la variable de tipo usuario de la clase Movimiento
	@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
	@JsonIgnore // Ignora esta propiedad al serializar a JSON
	private List<Movimientos> movimientos = new ArrayList<>();

	public Usuario(Integer idUsuario, String nombre, String password, String email) {
		this.idUsuario = idUsuario;
		this.nombre = nombre;
		this.password = password;
		this.email = email;
	}

	public List<Movimientos> getMovimientos() {
		return movimientos;
	}

	@Override
	public String toString() {
		return "Usuario [idUsuario=" + idUsuario + ", nombre=" + nombre + ", password=" + password + ", email=" + email
				+ ", movimientos=" + movimientos + "]";
	}

	public void setMovimientos(List<Movimientos> movimientos) {
		this.movimientos = movimientos;
	}

	public Usuario() {
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email, idUsuario, movimientos, nombre, password);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return Objects.equals(email, other.email) && Objects.equals(idUsuario, other.idUsuario)
				&& Objects.equals(movimientos, other.movimientos) && Objects.equals(nombre, other.nombre)
				&& Objects.equals(password, other.password);
	}

}
