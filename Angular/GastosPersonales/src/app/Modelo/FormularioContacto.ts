export class FormularioContacto {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;

  constructor(nombre: string, email: string, asunto: string, mensaje: string) {
    this.nombre = nombre;
    this.email = email;
    this.asunto = asunto;
    this.mensaje = mensaje;
  }
}
