package com.gastoInteligente.gastosCalculadora.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EnvioEmail {

	@Autowired
	private JavaMailSender mailSender;

	public boolean sendEmail(String to, String from, String nombre, String subject, String content) {

		from = from.trim();

		if (!isValidEmailAddress(from)) {
			System.out.println("La dirección de correo electrónico del remitente no es válida.");
			return false;
		}

		String datos = "Remitente: " + from + "\n";
		datos += "Asunto: " + subject + "\n";
		datos += "Nombre: " + nombre + "\n";
		datos += "Cuerpo del mensaje: " + content;

		SimpleMailMessage email = new SimpleMailMessage();

		email.setTo(to);
		email.setFrom(to);
		email.setSubject(subject);
		email.setText(datos);

		mailSender.send(email);

		return true;

	}

	private boolean isValidEmailAddress(String email) {
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
		return email.matches(emailRegex);
	}
}
