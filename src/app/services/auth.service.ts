import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'https://encuentro-matrimonial-backend.herokuapp.com';
    public isAuthenticated = false;
  router: any;
  
    constructor(private http: HttpClient) {}
  
    login(username: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
        .pipe(
          map(response => {
            // Guardar el token en local storage
            localStorage.setItem('jwt', response.jwt);
            // Establecer isAuthenticated en true
            this.isAuthenticated = true;

            return response;
          })
        );
    }
}
  
    // Resto de métodos de la clase AuthService
  