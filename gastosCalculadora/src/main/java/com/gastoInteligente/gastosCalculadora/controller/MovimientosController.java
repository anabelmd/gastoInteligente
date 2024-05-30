package com.gastoInteligente.gastosCalculadora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.gastoInteligente.gastosCalculadora.model.CategoriaGastos;
import com.gastoInteligente.gastosCalculadora.model.MovimientoRequest;
import com.gastoInteligente.gastosCalculadora.model.MovimientoResponse;
import com.gastoInteligente.gastosCalculadora.model.Movimientos;
import com.gastoInteligente.gastosCalculadora.model.Usuario;
import com.gastoInteligente.gastosCalculadora.service.CategoriaService;
import com.gastoInteligente.gastosCalculadora.service.MovimientosService;
import com.gastoInteligente.gastosCalculadora.service.UsuarioService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({ "/movimientos" })
public class MovimientosController {

	@Autowired
	private CategoriaService categoriaService;

	@Autowired
	private MovimientosService movimientoService;

	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping(value = "/crear", method = RequestMethod.POST)
	public ResponseEntity<String> crearMovimiento(@RequestBody List<MovimientoRequest> movimientos) {
		System.out.println("Entrando en la función crearMovimiento"); // Mensaje de registro

		try {

			Date fechaActual = new Date(); // Obtiene la fecha actual

			for (MovimientoRequest movimientoRequest : movimientos) {
				// Obtener el email de usuario del objeto de solicitud
				String email = movimientoRequest.getEmailUsuario(movimientoRequest.getUsuario());
				int idCategoria = movimientoRequest.getIdCategoria();
				// Buscar al usuario en la base de datos por su email de usuario
				Usuario usuario = usuarioService.findUsuarioByEmail(email);
				if (usuario == null) {
					return ResponseEntity.badRequest().body("Usuario no encontrado");
				}

				// Crear un objeto de Movimientos a partir de la solicitud y asignar el usuario
				Movimientos movimiento = new Movimientos();
				movimiento.setCantidad(movimientoRequest.getCantidad());
				movimiento.setUsuario(usuario);
				CategoriaGastos categoria = new CategoriaGastos(idCategoria);
				movimiento.setCategoria(categoria);
				movimiento.setFecha(fechaActual); // Establece la fecha actual
				// Ajusta el resto de las propiedades de movimiento según la solicitud

				movimientoService.guardarMovimiento(movimiento);
			}
		} catch (Exception e) {
			e.printStackTrace(); // Opcional: Imprime la traza de la excepción para diagnóstico
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
		}
		return ResponseEntity.ok("Movimiento(s) creado(s) exitosamente.");
	}

	@RequestMapping(value = "listar/{email}", method = RequestMethod.GET)
	public ResponseEntity<List<MovimientoResponse>> obtenerMovimientosPorUsuario(@PathVariable String email) {
		Usuario usuario = usuarioService.findUsuarioByEmail(email);
		if (usuario == null) {
			return ResponseEntity.notFound().build();
		}
		List<MovimientoResponse> movimientosResponse = new ArrayList<>();

		for (Movimientos movimiento : usuario.getMovimientos()) {
			MovimientoResponse movimientoResponse = new MovimientoResponse();
			movimientoResponse.setIdMovimiento(movimiento.getIdMovimiento());
			movimientoResponse.setCantidad(movimiento.getCantidad());
			movimientoResponse.setFecha(movimiento.getFecha());
			movimientoResponse.setCategoria(movimiento.getCategoria());
			movimientoResponse.setUsuario(usuario); // Puedes establecer el usuario si es necesario

			movimientosResponse.add(movimientoResponse);
		}

		return ResponseEntity.ok(movimientosResponse);
	}

	@DeleteMapping("/eliminar/{idMovimiento}")
	public ResponseEntity<Void> eliminarMovimiento(@PathVariable Integer idMovimiento) {
		// Lógica para eliminar el movimiento por su ID
		movimientoService.eliminarMovimientoPorId(idMovimiento);
		System.out.println("Se ha eliminado el movimiendo con id: " + idMovimiento);
		return ResponseEntity.noContent().build();

	}

	@PutMapping("/editar/{idMovimiento}")
	public ResponseEntity<?> actualizarMovimiento(@PathVariable Integer idMovimiento,
			@RequestBody Movimientos movimiento) {
		// Verificar si el movimiento existe en la base de datos
		Movimientos movimientoActualizado = movimientoService.actualizarMovimiento(idMovimiento, movimiento);
		if (movimientoActualizado != null) {
			return ResponseEntity.ok().body("Movimiento actualizado exitosamente");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el movimiento");
		}
	}

}
