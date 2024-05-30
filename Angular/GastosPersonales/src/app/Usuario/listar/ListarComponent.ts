import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Movimientos } from '../../Modelo/Movimientos';
import { MovimientoService } from '../../Service/movimiento.service';
import { AuthService } from '../../Service/auth.service';
import { ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { PieChartComponent } from 'src/app/Componentes/pie-chart/pie-chart.component'; // Importa PieChartComponent

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit, AfterViewInit {
  @ViewChild('mesSelector') mesSelector!: ElementRef;
  @ViewChild('anioSelector') anioSelector!: ElementRef;

  movimientos: Movimientos[] = [];
  movimientoOriginal: Movimientos = new Movimientos();
  fechaOriginal: Date | undefined;
  ordenAscendente: boolean = true;
  mes: any;

  constructor(
    private movimientoService: MovimientoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const mes = parseInt(this.mesSelector.nativeElement.value, 10);
    const anio = parseInt(this.anioSelector.nativeElement.value, 10);
    this.obtenerMovimientos(mes, anio);

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // getMonth() devuelve 0 para enero, por lo que sumamos 1
    const anioActual = fechaActual.getFullYear();

    // Establecer los valores del select
    this.mesSelector.nativeElement.value = mesActual;
    this.anioSelector.nativeElement.value = anioActual;

    // Cargar los movimientos del mes y año actuales
    this.obtenerMovimientos(mesActual, anioActual);
  }

  obtenerMovimientos(mesFiltro: number, anio: number): void {
    const userEmail = this.authService.getUserEmail();

    if (userEmail !== null) {
      this.movimientoService
        .obtenerMovimientos(userEmail)
        .subscribe((movimientos) => {
          this.movimientos =
            this.movimientoService.filtrarMovimientosPorMesYAnio(
              movimientos,
              mesFiltro,
              anio
            );
        });
    } else {
      console.error('El email del usuario es null.');
    }
  }

  eliminarMovimiento(idMovimiento: number) {
    this.estasSeguro(idMovimiento);
  }

  editarMovimiento(movimiento: Movimientos): void {
    this.movimientoOriginal = { ...movimiento };
    this.fechaOriginal = movimiento.fecha;

    movimiento.editando = true;
    //window.location.reload();
  }

  guardarMovimiento(movimiento: Movimientos): void {
    // Validación para que la cantidad no sea 0 o negativa
    if (movimiento.cantidad === undefined || movimiento.cantidad <= 0) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'No se pueden guardar movimientos con cantidad 0 o negativa.',
        icon: 'error',
        confirmButtonColor: '#52aca7',
      });
      return;
    }

    this.movimientoService.actualizarMovimiento(movimiento).subscribe(
      () => {
        Swal.fire({
          title: '¡Guardado!',
          text: 'El movimiento ha sido actualizado.',
          icon: 'success',
          confirmButtonColor: '#52aca7',
        });
        console.log('Movimiento actualizado exitosamente');
        movimiento.editando = false;

        // Recargar los movimientos después de guardar
        const mesActual = parseInt(this.mesSelector.nativeElement.value, 10);
        const anioActual = parseInt(this.anioSelector.nativeElement.value, 10);
        this.obtenerMovimientos(mesActual, anioActual);
      },
      (error) => {
        console.error('Error al actualizar el movimiento:', error);
      }
    );
  }

  validarFecha(movimiento: Movimientos): boolean {
    if (movimiento && movimiento.fecha) {
      const fechaActual = new Date();
      const fechaMovimiento = new Date(movimiento.fecha);
      return fechaMovimiento <= fechaActual;
    }
    return true;
  }

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const anio = fechaActual.getFullYear();
    return `${anio}-${mes < 10 ? '0' + mes : mes}-${
      dia < 10 ? '0' + dia : dia
    }`;
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  cancelarEdicion(movimiento: Movimientos): void {
    Object.assign(movimiento, this.movimientoOriginal);
    movimiento.fecha = this.fechaOriginal;

    movimiento.editando = false;
  }

  calcularTotal(): number {
    let total = 0;

    this.movimientos.forEach((movimiento) => {
      const cantidad = movimiento.cantidad || 0;
      if (movimiento.categoria && movimiento.categoria.nombreCategoria) {
        if (
          movimiento.categoria.idCategoria == 1 ||
          movimiento.categoria.idCategoria == 2
        ) {
          total += cantidad;
        } else {
          total -= cantidad;
        }
      }
    });

    return total;
  }

  estasSeguro(idMovimiento: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      iconColor: '#52aca7',
      showCancelButton: true,
      confirmButtonColor: '#52aca7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.movimientoService.eliminarMovimiento(idMovimiento).subscribe(
          () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El movimiento ha sido eliminado.',
              icon: 'success',
              confirmButtonColor: '#52aca7',
            });
            console.log('Movimiento eliminado correctamente');
            this.obtenerMovimientos(5, 2024);
          },
          (error) => {
            console.error('Error al eliminar movimiento:', error);
          }
        );
      }
    });
  }
}
