import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/gastosCalculadora';
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  isAuthenticated(): boolean {
    // Recupera el token del almacenamiento local
    const token = localStorage.getItem('token');

    // Devuelve true si el token existe y no está vacío
    return token !== null && token !== '';
  }

  getUserEmail(): string | null {
    // Recupera el token del almacenamiento local
    const token = localStorage.getItem('token');
    // Decodifica el token para obtener la información del usuario
    if (token) {
      try {
        const tokenPayload = this.jwtHelper.decodeToken(token);
        // Devuelve el ID del usuario desde el token
        return tokenPayload.sub;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    } else {
      return null;
    }
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/logout`, {}).pipe(
      tap(() => {
        // Eliminar el token del local storage al cerrar sesión
        localStorage.removeItem('token');
      })
    );
  }
}
