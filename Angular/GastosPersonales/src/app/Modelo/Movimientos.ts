import { CategoriaGastos } from './CategoriaGastos';
import { Usuario } from './Usuario';

export class Movimientos {
  idCategoria?: number;
  cantidad?: number;
  idMovimiento?: number;
  fecha?: Date;
  usuario?: Usuario;
  categoria?: CategoriaGastos; // Ajusta la declaración de tipo aquí
  //editandoCantidad: boolean = false; // Variable para controlar la edición de la cantidad
  //editandoFecha: boolean = false; //
  editando?: boolean;

  constructor(
    idCategoria?: number,
    cantidad?: number,
    idMovimiento?: number,
    fecha?: Date,
    categoria?: CategoriaGastos,
    usuario?: Usuario,
    //editandoCantidad?: boolean,
    //editandoFecha?: boolean
    editando?: boolean
  ) {
    this.idCategoria = idCategoria;
    this.cantidad = cantidad;
    this.fecha = fecha;
    this.categoria = categoria;
    this.usuario = usuario;
    this.idMovimiento = idMovimiento;
    this.editando = editando !== undefined ? editando : false; // Valor por defecto para editandoCantidad
    //this.editandoFecha = editandoFecha !== undefined ? editandoFecha : false; // Valor por defecto para editandoFecha
  }
}
