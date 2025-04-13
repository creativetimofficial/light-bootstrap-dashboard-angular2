import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8094/authenticate'; // URL du backend

  constructor(private http: HttpClient) {}

  login(credentials: { login: string, motDePasse: string }): Observable<{token: string}> {
    return this.http.post<{token: string}>(this.apiUrl, credentials);
  }
  
  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}
