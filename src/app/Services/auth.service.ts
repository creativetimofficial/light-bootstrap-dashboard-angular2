import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface SignUpRequest {
  nom: string;
  email: string;
  role:number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  signUp(data: SignUpRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  signIn(data: SignInRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, data);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
