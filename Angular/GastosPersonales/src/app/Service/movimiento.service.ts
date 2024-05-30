import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimientos } from '../Modelo/Movimientos';
import { Usuario } from '../Modelo/Usuario';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  private URL_BACKEND_CREAR =
    'http://localhost:8080/gastosCalculadora/movimientos/crear';

  private URL_BACKEND_LISTAR =
    'http://localhost:8080/gastosCalculadora/movimientos/listar';

  private URL_BACKEND_ELIMINAR =
    'http://localhost:8080/gastosCalculadora/movimientos/eliminar';

  private URL_BACKEND_EDITAR =
    'http://localhost:8080/gastosCalculadora/movimientos/editar';

  constructor(private http: HttpClient) {}

  crearMovimiento(
    movimiento: Movimientos[],
    userEmail: string
  ): Observable<any> {
    const movimientosFormateados = movimiento.map((m) => ({
      cantidad: m.cantidad,
      categoria: { idCategoria: m.idCategoria },
      // Agregar el ID del usuario
      usuario: { email: userEmail },
    }));
    return this.http.post<string>(
      this.URL_BACKEND_CREAR,
      movimientosFormateados,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  // Método para obtener todos los movimientos
  obtenerMovimientos(email: string): Observable<Movimientos[]> {
    const url = `${this.URL_BACKEND_LISTAR}/${email}`;
    return this.http.get<Movimientos[]>(url);
  }

  filtrarMovimientosPorMesYAnio(
    movimientos: Movimientos[],
    mes: number,
    anio: number
  ): Movimientos[] {
    return movimientos.filter((movimiento) => {
      const fechaMovimiento: Date = movimiento.fecha
        ? new Date(movimiento.fecha)
        : new Date(); // Asigna una fecha por defecto si la fecha del movimiento es undefined
      if (fechaMovimiento) {
        return (
          fechaMovimiento.getMonth() + 1 === mes &&
          fechaMovimiento.getFullYear() === anio
        );
      } else {
        console.error('La fecha del movimiento es undefined.');
        return false; // Devuelve false si la fecha del movimiento es undefined
      }
    });
  }

  eliminarMovimiento(idMovimiento: number): Observable<void> {
    const urlEliminar = `${this.URL_BACKEND_ELIMINAR}/${idMovimiento}`;
    return this.http.delete<void>(urlEliminar);
  }

  actualizarMovimiento(movimiento: Movimientos): Observable<any> {
    return this.http.put<any>(
      `${this.URL_BACKEND_EDITAR}/${movimiento.idMovimiento}`,
      movimiento,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
