import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Modelo/Usuario';

@Injectable({
  providedIn: 'root',
})
export class RegistroUserService {
  private url = 'http://localhost:8080/gastosCalculadora/usuarios/registro';

  constructor(private httpClient: HttpClient) {}

  registerUser(usuario: Usuario): Observable<any> {
    return this.httpClient.post(`${this.url}`, usuario);
  }
}
