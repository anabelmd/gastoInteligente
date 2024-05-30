import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraComponent implements OnInit {
  mensajePresente: boolean = false;
  constructor(private authService: AuthService) {}
  mostrarMensaje() {
    this.mensajePresente = true;
  }

  ocultarMensaje() {
    this.mensajePresente = false;
  }

  ngOnInit(): void {
    // Verificar si el usuario está autenticado al cargar el componente
    if (!this.authService.isAuthenticated()) {
      this.showFunction();
      // Si el usuario no está autenticado, hacer algo, como redirigir a la página de inicio de sesión
      // Por ejemplo:
      // this.router.navigate(['/login']);
    }
  }

  // Otros métodos de la clase...

  showFunction() {
    this.mostrarMensaje();
    const Toast = Swal.fire({
      icon: 'info',
      iconColor: '#52aca7',
      title: 'Oops...',
      text: 'Para disfrutar de este servicio debe iniciar sesión',
      showCancelButton: false, // Oculta el botón de cancelar
      confirmButtonText: 'Iniciar Sesión', // Cambia el texto del botón de confirmación
      confirmButtonColor: '#52aca7',
      showCloseButton: true, // Muestra el botón de cerrar
      footer: '¿No tienes cuenta? <a href="/registro">Regístrate</a>', // Personaliza el footer
      allowOutsideClick: false, // Evita que el usuario cierre el modal haciendo clic fuera de él
      allowEscapeKey: false, // Evita que el usuario cierre el modal presionando la tecla Esc
    });

    // Agrega un evento de clic al botón de confirmación para redirigir al usuario
    Toast.then((result) => {
      if (result.isConfirmed) {
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = '/login';
      } else if (result.dismiss === Swal.DismissReason.close) {
        // El usuario ha cerrado el mensaje, redirige a la página de inicio
        window.location.href = '/'; // o a cualquier otra página de inicio que prefieras
      }
    });
  }
}
