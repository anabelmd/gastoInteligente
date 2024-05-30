package com.gastoInteligente.gastosCalculadora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gastoInteligente.gastosCalculadora.model.FormularioContacto;
import com.gastoInteligente.gastosCalculadora.service.EnvioEmail;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/contacto" })
public class FormularioController {

	@Autowired
	private EnvioEmail envio;

	// localhost:8080/gastosCalculadora/contacto
	@PostMapping()
	public ResponseEntity<String> recoger(@RequestBody FormularioContacto formulario) {
		String nombre = formulario.getNombre();
		String email = formulario.getEmail();
		String asunto = formulario.getAsunto();
		String mensaje = formulario.getMensaje();

		if (envio.sendEmail("gastospersonalesproyect@outlook.es", email, nombre, asunto, mensaje)) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("Respuesta válida");

		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("El correo electrónico del remitente no es válido.");

		}

	}
}
