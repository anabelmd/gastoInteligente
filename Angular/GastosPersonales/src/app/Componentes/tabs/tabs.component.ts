import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  activeTab: string = 'tab1';
  objetivo: number | undefined; // Define la propiedad objetivo
  fecha: string = ''; // Define la propiedad fecha
  objetivo2: number | undefined; // Define la propiedad objetivo2
  ahorro: number | undefined; // Define la propiedad ahorro

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  calcularAhorroMensual() {
    if (this.objetivo && this.fecha) {
      const fechaObjetivo = new Date(this.fecha);
      const fechaActual = new Date();
      const diferenciaMeses =
        (fechaObjetivo.getFullYear() - fechaActual.getFullYear()) * 12 +
        (fechaObjetivo.getMonth() - fechaActual.getMonth());
      if (diferenciaMeses > 0) {
        const ahorroMensual = this.objetivo / diferenciaMeses;
        Swal.fire({
          title: 'Ahorro mensual',
          text: `Debes ahorrar ${ahorroMensual.toFixed(
            2
          )}€ mensualmente para alcanzar tu objetivo.`,
          icon: 'info',
          confirmButtonText: 'Aceptar',
        });
      } else {
        Swal.fire({
          title: 'Fecha inválida',
          text: 'La fecha objetivo debe ser, de al menos, un mes a partir del mes actual.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        title: 'Datos incompletos',
        text: 'Por favor, ingresa un objetivo y una fecha válida.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  calcularMesesParaObjetivo() {
    if (
      this.objetivo2 &&
      this.ahorro &&
      this.objetivo2 > 0 &&
      this.ahorro > 0
    ) {
      const meses = this.objetivo2 / this.ahorro!;
      Swal.fire({
        title: 'Meses necesarios',
        text: `Necesitarás aproximadamente ${Math.ceil(
          meses
        )} meses para alcanzar tu objetivo.`,
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
    } else {
      Swal.fire({
        title: 'Datos incompletos',
        text: 'Por favor, ingresa un objetivo y un ahorro mensual válido.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
