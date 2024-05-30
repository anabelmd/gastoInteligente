import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../Modelo/Usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginuserService {
  private url = 'http://localhost:8080/gastosCalculadora/usuarios/login';

  constructor(private httpClient: HttpClient) {}

  loginUser(usuario: Usuario): Observable<any> {
    // Realizar la solicitud HTTP POST al servidor
    return this.httpClient.post<any>(this.url, usuario).pipe(
      tap((response) => {
        // Manejar la respuesta del servidor
        if (response && response.token) {
          // Si la respuesta contiene un token, almacenarlo en el almacenamiento local
          this.storeToken(response.token);
        } else {
          // Manejar cualquier otro caso, como errores de autenticación
          console.error('No se recibió un token válido del servidor');
        }
      })
    );
  }

  private storeToken(token: string): void {
    // Almacenar el token en el almacenamiento local
    localStorage.setItem('token', token);
  }
}
