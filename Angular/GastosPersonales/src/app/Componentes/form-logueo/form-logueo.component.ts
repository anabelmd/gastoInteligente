import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Modelo/Usuario';
import { LoginuserService } from 'src/app/Service/loginuser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-logueo',
  templateUrl: './form-logueo.component.html',
  styleUrls: ['./form-logueo.component.css'],
})
export class FormLogueoComponent implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(
    private loginuserservice: LoginuserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userLogin() {
    console.log(this.usuario);
    this.loginuserservice.loginUser(this.usuario).subscribe(
      (data) => {
        //alert('Login Successfully');
        this.showSuccessNotification();
        this.redirectToHomePage();
      },
      (error) => {
        this.usuarioIncorrecto();
        this.resetearFormulario();
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
      title: '¡Bienvenido a gastoInteligente!',
    });
  }

  usuarioIncorrecto() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario y/o contraseña incorrectos',
    });
  }

  redirectToHomePage() {
    // Redirigir a la página de inicio después de 3 segundos
    setTimeout(() => {
      this.router.navigate(['/']); // Cambia '/inicio' al enrutamiento de tu página de inicio
    }, 3000);
  }

  resetearFormulario() {
    this.usuario.email = '';
    this.usuario.password = '';
  }
}
