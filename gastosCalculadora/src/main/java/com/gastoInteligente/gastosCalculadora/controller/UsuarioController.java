package com.gastoInteligente.gastosCalculadora.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gastoInteligente.gastosCalculadora.model.AuthResponse;
import com.gastoInteligente.gastosCalculadora.model.Usuario;
import com.gastoInteligente.gastosCalculadora.security.CustomUserDetails;
import com.gastoInteligente.gastosCalculadora.security.JwtUtil;

import com.gastoInteligente.gastosCalculadora.service.UsuarioService;

import jakarta.servlet.http.HttpServletRequest;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/usuarios" })

public class UsuarioController {

	@Autowired
	private UsuarioService servicio;

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

	// Funcionalidad para el logueo
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Usuario userData, HttpServletRequest request) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userData.getEmail(), userData.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		// Generar el token JWT
		String token = jwtUtil.generateToken(userDetails);

		// Devolver el token JWT junto con un mensaje de éxito
		return ResponseEntity.ok(new AuthResponse(token, "Inicio de sesión exitoso"));

	}

	// CERRAR LA SESIÓN
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public ResponseEntity<?> handleOptions() {
		// Invalidar el contexto de seguridad para cerrar la sesión
		SecurityContextHolder.clearContext();

		// Devuelve una respuesta exitosa
		return ResponseEntity.ok().build();
	}

	// Obtener todos los usuarios

	public List<Usuario> listar() {
		return servicio.findAll();
	}

	// REGISTRO DE USUARIO
	@PostMapping("/registro")
	public ResponseEntity<?> registerUser(@RequestBody Usuario usuario) {
		// Verificar si el email ya está registrado
		if (servicio.findUsuarioByEmail(usuario.getEmail()) != null) {
			return ResponseEntity.badRequest().body("El correo electrónico ya está registrado");
		}
		// Validar que todos los campos estén rellenos
		if (usuario.getNombre() == null || usuario.getEmail() == null || usuario.getPassword() == null) {
			return ResponseEntity.badRequest().body("Todos los campos son obligatorios");
		}
		// Validar el formato del email
		if (!isValidEmail(usuario.getEmail())) {
			return ResponseEntity.badRequest().body("El formato del correo electrónico es incorrecto");
		}
		Usuario nuevoUsuario = null;
		try {
			// Cifrar la contraseña antes de guardarla en la base de datos
			String encryptedPassword = passwordEncoder.encode(usuario.getPassword());
			usuario.setPassword(encryptedPassword);
			nuevoUsuario = servicio.save(usuario);
			// Generar el token JWT
			String token = jwtUtil.generateToken(new CustomUserDetails(nuevoUsuario));

			// Devolver el token junto con el usuario registrado
			return ResponseEntity.ok(new AuthResponse(token, "Usuario registrado exitosamente"));
		} catch (Exception e) {
			servicio.delete(nuevoUsuario); // Eliminar el usuario de la base de datos

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	private boolean isValidEmail(String email) {
		// Validar el formato del email utilizando expresiones regulares
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
		return email.matches(emailRegex);
	}

}
