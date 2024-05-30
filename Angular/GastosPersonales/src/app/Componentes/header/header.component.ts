import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  userEmail: string | null = null;
  showWelcomeMessage: boolean = false; // Agrega esta línea

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar el estado de autenticación al inicializar el componente
    this.isAuthenticated = this.authService.isAuthenticated();
    // Obtener el correo electrónico del usuario si está autenticado
    if (this.isAuthenticated) {
      this.userEmail = this.authService.getUserEmail();
    }
  }

  // Función para cerrar sesión
  logout(): void {
    this.authService.logout().subscribe(
      () => {
        // Cerrar sesión exitosamente
        this.isAuthenticated = false;
        this.userEmail = null;
        this.showSuccessNotification();
        this.redirectToHomePage();
        // Redirigir a la página de inicio de sesión u otra página de tu aplicación
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al cerrar sesión:', error);
      }
    );
  }

  showSuccessNotification() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: '¡Nos vemos pronto!',
    });
  }

  redirectToHomePage() {
    // Redirigir a la página de inicio después de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/']); // Cambia '/inicio' al enrutamiento de tu página de inicio
    }, 3000);
  }
}
