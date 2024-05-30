import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario';
import { RegistroUserService } from 'src/app/Service/registro-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css'],
})
export class FormRegistroComponent implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(
    private registroUserService: RegistroUserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerUser() {
    // Verificar que todos los campos estén rellenos
    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.password) {
      this.faltanCampos();
      return;
    }

    // Verificar el formato del correo electrónico
    if (!this.isValidEmail(this.usuario.email)) {
      this.formatoEmailIncorrecto();
      this.usuario.email = '';
      return;
    }

    // Llamar al servicio para registrar el usuario
    this.registroUserService.registerUser(this.usuario).subscribe(
      (data) => {
        this.correcto();
      },
      (error) => {
        // Capturar el error y determinar su tipo
        if (
          error.status === 400 &&
          error.error === 'El correo electrónico ya está registrado'
        ) {
          // Código de error 400 y mensaje específico indican que el correo ya está registrado
          this.emailRegistrado();
          //this.usuario.email = '';
        } else if (error.status === 500) {
          // Código de error 500 y mensaje específico indican un problema con la contraseña encriptada
          console.error(error);
          this.contraseñaInvalida();
        } else {
          // Otros tipos de error, muestra un mensaje genérico de error
          console.error(error);
          this.mostrarErrorGenerico();
        }
      }
    );
  }
  mostrarErrorGenerico() {
    throw new Error('Error de sistema, contacte con sistemas.');
  }
  contraseñaInvalida() {
    throw new Error('Contraseña no valida');
  }

  // Función para validar el formato del correo electrónico
  private isValidEmail(email: string): boolean {
    const emailRegex =
      /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  emailRegistrado() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El correo ya está registrado',
      confirmButtonColor: '#52aca7',
    });
  }

  formatoEmailIncorrecto() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El formato del correo electrónico es incorrecto',
      confirmButtonColor: '#52aca7',
    });
  }

  faltanCampos() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos son obligatorios',
      confirmButtonColor: '#52aca7',
    });
  }

  correcto() {
    Swal.fire({
      title: 'Usuario registrado',
      text: '¡Bienvenido a gastoInteligente!',
      icon: 'success',
      confirmButtonColor: '#52aca7',
    }).then(() => {
      this.redirectToHomePage();
    });
  }

  redirectToHomePage() {
    // Redirigir a la página de inicio después de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/']); // Cambia '/inicio' al enrutamiento de tu página de inicio
    }, 2000);
  }
}
