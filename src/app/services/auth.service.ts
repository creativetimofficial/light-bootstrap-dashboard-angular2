import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'https://encuentro-matrimonial-backend.herokuapp.com';
    public isAuthenticated = false;
  
  constructor(private http: HttpClient, private router: Router) {}
  
    login(username: string, password: string) {
      return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
        map(response => {
          // Guardar el token en local storage
          if (response.code == "401"){
            alert ("Credenciales incorrectas")
          }else     {
            this.router.navigate(['/dashboard']);

          }
          localStorage.setItem('jwt', response.jwt);
          
          // Establecer isAuthenticated en true
          this.isAuthenticated = true;
          return this.isAuthenticated;
        }),
        catchError(error => {
          if (error.status === 401) {
            this.isAuthenticated = false;
            return of(this.isAuthenticated);
          }
          return throwError(error);
        })
      )
    }
}
  
    // Resto de métodos de la clase AuthService
  