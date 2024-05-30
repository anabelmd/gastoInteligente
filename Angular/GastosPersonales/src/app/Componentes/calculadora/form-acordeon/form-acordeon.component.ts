import { Component } from '@angular/core';
import { Movimientos } from '../../../Modelo/Movimientos';
import { MovimientoService } from '../../../Service/movimiento.service';
import { AuthService } from '../../../Service/auth.service'; // Importa el servicio de autenticación si lo tienes
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-acordeon',
  templateUrl: './form-acordeon.component.html',
  styleUrls: ['./form-acordeon.component.css'],
})
export class FormAcordeonComponent {
  showPanelOne: boolean = false;
  showPanelTwo: boolean = false;
  showPanelThree: boolean = false;
  showPanelFour: boolean = false;

  salarioFamiliar: number | undefined;
  otrasFuentesIngresos: number | undefined;
  hipotecaAlquiler: number | undefined;
  aguaGasElectricidad: number | undefined;
  internetTelevision: number | undefined;
  telefono: number | undefined;
  cocheMoto: number | undefined;
  seguroCocheMoto: number | undefined;
  mantenimientoCoche: number | undefined;
  gasolina: number | undefined;
  transportePublico: number | undefined;
  matriculaEscolar: number | undefined;
  materialEscolar: number | undefined;
  gastosExtraEscolares: number | undefined;
  alimentacion: number | undefined;
  ropa: number | undefined;
  vacaciones: number | undefined;
  gastosMedicos: number | undefined;
  mascota: number | undefined;
  otrosGastos: number | undefined;
  seguroHogar: number | undefined;

  constructor(
    private movimientoService: MovimientoService,
    private authService: AuthService,
    private router: Router
  ) {}

  enviarFormulario(): void {
    // Obtener el ID del usuario logueado
    const userEmail = this.authService.getUserEmail(); // Reemplaza esto con el método adecuado para obtener el ID del usuario

    // Crear un array para almacenar los movimientos filtrados
    const movimientos: Movimientos[] = [];

    // Función para determinar si un valor es distinto de cero
    function esvalido(valor: number | undefined): valor is number {
      return valor !== undefined && valor > 0;
    }

    // Filtrar los datos y crear los movimientos solo para los valores distintos de cero
    if (esvalido(this.salarioFamiliar)) {
      movimientos.push(new Movimientos(1, this.salarioFamiliar));
    }
    if (esvalido(this.otrasFuentesIngresos)) {
      movimientos.push(new Movimientos(2, this.otrasFuentesIngresos));
    }
    if (esvalido(this.hipotecaAlquiler)) {
      movimientos.push(new Movimientos(3, this.hipotecaAlquiler));
    }
    if (esvalido(this.seguroHogar)) {
      movimientos.push(new Movimientos(4, this.seguroHogar));
    }
    if (esvalido(this.aguaGasElectricidad)) {
      movimientos.push(new Movimientos(5, this.aguaGasElectricidad));
    }
    if (esvalido(this.internetTelevision)) {
      movimientos.push(new Movimientos(6, this.internetTelevision));
    }
    if (esvalido(this.telefono)) {
      movimientos.push(new Movimientos(7, this.telefono));
    }
    if (esvalido(this.cocheMoto)) {
      movimientos.push(new Movimientos(8, this.cocheMoto));
    }
    if (esvalido(this.seguroCocheMoto)) {
      movimientos.push(new Movimientos(9, this.seguroCocheMoto));
    }
    if (esvalido(this.mantenimientoCoche)) {
      movimientos.push(new Movimientos(10, this.mantenimientoCoche));
    }
    if (esvalido(this.gasolina)) {
      movimientos.push(new Movimientos(11, this.gasolina));
    }
    if (esvalido(this.transportePublico)) {
      movimientos.push(new Movimientos(12, this.transportePublico));
    }
    if (esvalido(this.matriculaEscolar)) {
      movimientos.push(new Movimientos(13, this.matriculaEscolar));
    }
    if (esvalido(this.materialEscolar)) {
      movimientos.push(new Movimientos(14, this.materialEscolar));
    }
    if (esvalido(this.gastosExtraEscolares)) {
      movimientos.push(new Movimientos(15, this.gastosExtraEscolares));
    }
    if (esvalido(this.alimentacion)) {
      movimientos.push(new Movimientos(16, this.alimentacion));
    }
    if (esvalido(this.ropa)) {
      movimientos.push(new Movimientos(17, this.ropa));
    }
    if (esvalido(this.vacaciones)) {
      movimientos.push(new Movimientos(18, this.vacaciones));
    }
    if (esvalido(this.gastosMedicos)) {
      movimientos.push(new Movimientos(19, this.gastosMedicos));
    }
    if (esvalido(this.mascota)) {
      movimientos.push(new Movimientos(20, this.mascota));
    }
    if (esvalido(this.otrosGastos)) {
      movimientos.push(new Movimientos(21, this.otrosGastos));
    }

    if (userEmail !== null) {
      // Luego, puedes enviar los movimientos solo si hay al menos uno para enviar
      if (movimientos.length > 0) {
        this.movimientoService
          .crearMovimiento(movimientos, userEmail)
          .subscribe(
            (response) => {
              this.guardadoCorrectamente();
              console.log('Movimientos enviados correctamente', response);
              // Recargar la página después de crear los movimientos
            },
            (error) => {
              this.noGuardadoCorrectamente();
              console.error('Error al enviar los movimientos', error);
              // Manejar errores si es necesario
            }
          );
      } else {
        Swal.fire({
          title: 'Valor inválido',
          text: 'No se pueden guardar movimientos con cantidad 0 o negativa.',
          icon: 'error',
          confirmButtonColor: '#52aca7',
        });
        return;
      }
    } else {
      console.error('El ID de usuario es nulo');
    }
  }

  togglePanelOne() {
    this.showPanelOne = !this.showPanelOne;
    if (this.showPanelOne) {
      this.showPanelTwo = false;
      this.showPanelThree = false;
      this.showPanelFour = false;
    }
  }

  togglePanelTwo() {
    this.showPanelTwo = !this.showPanelTwo;
    if (this.showPanelTwo) {
      this.showPanelOne = false;
      this.showPanelThree = false;
      this.showPanelFour = false;
    }
  }

  togglePanelThree() {
    this.showPanelThree = !this.showPanelThree;
    if (this.showPanelThree) {
      this.showPanelOne = false;
      this.showPanelTwo = false;
      this.showPanelFour = false;
    }
  }

  togglePanelFour() {
    this.showPanelFour = !this.showPanelFour;
    if (this.showPanelFour) {
      this.showPanelOne = false;
      this.showPanelTwo = false;
      this.showPanelThree = false;
    }
  }

  guardadoCorrectamente() {
    Swal.fire({
      title: 'Movimientos guardados',
      icon: 'success',
      confirmButtonColor: '#52aca7',
    }).then(() => {
      window.location.reload();
    });
  }

  noGuardadoCorrectamente() {
    Swal.fire({
      title: 'Error al guardar los movimientos',
      icon: 'error',
      confirmButtonColor: '#52aca7',
    }).then(() => {
      window.location.reload();
    });
  }
}
