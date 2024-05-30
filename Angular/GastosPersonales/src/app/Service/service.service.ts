import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Modelo/Usuario';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  //HttpClient es para hacer la conexión con el backend
  constructor(private http: HttpClient) {}

  Url = 'http://localhost:8080/gastosCalculadora/usuarios';

  //Debo crear la clase Usuario

  getUsuarios() {
    return this.http.get<Usuario[]>(this.Url); //Con esta línea se obtiene los datos de la url de arriba (http://localhost:8080/Ejemplo01/usuarios)
  }
}
