import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormularioContacto } from 'src/app/Modelo/FormularioContacto';
import { FormcontactoService } from 'src/app/Service/formcontacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  constructor(private router: Router, private service: FormcontactoService) {}

  formulario: FormularioContacto = new FormularioContacto('', '', '', '');

  enviarFormulario() {
    if (
      this.formulario.nombre &&
      this.formulario.email &&
      this.formulario.asunto &&
      this.formulario.mensaje
    ) {
      this.service.createFormulario(this.formulario).subscribe(
        (data) => {
          this.correcto();

          this.router.navigate(['contacto']);
        },
        (error) => {
          if (error.status === 400) {
            this.incorrecto();
          } else if (error.status !== 400) {
            this.correcto();
            this.router.navigate(['contacto']);
          }
        }
      );
    } else {
      this.incorrecto();
    }
  }

  correcto() {
    Swal.fire({
      title: 'Mensaje enviado',
      text: 'Le responderemos lo antes posible',
      icon: 'success',
      confirmButtonColor: '#52aca7',
    }).then(() => {
      this.resetearFormulario(); // Restablece los campos del formulario después de cerrar el mensaje
    });
  }

  incorrecto() {
    Swal.fire({
      title: 'Mensaje no enviado',
      text: 'Falta algún campo por rellenar o el correo es incorrecto',
      icon: 'error',
      confirmButtonColor: '#52aca7',
    }).then(() => {
      this.resetearFormulario(); // Restablece los campos del formulario después de cerrar el mensaje
    });
  }

  resetearFormulario() {
    this.formulario.nombre = '';
    this.formulario.email = '';
    this.formulario.asunto = '';
    this.formulario.mensaje = '';
  }

  ngOnInit(): void {
    // Ajustar el scroll al inicio de la página cuando la navegación entre componentes ha finalizado
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
