import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormularioContacto } from '../Modelo/FormularioContacto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class FormcontactoService {
  //HttpClient es para hacer la conexión con el backend
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/gastosCalculadora/contacto';
  //Debo crear la clase formulario

  createFormulario(formularioContacto: FormularioContacto): Observable<any> {
    return this.http.post<FormularioContacto>(this.url, formularioContacto);
  }
}
