// employeur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeurService {
  private apiUrl = 'http://localhost:8094/employeurs'; // ou l'URL de votre API

  constructor(private http: HttpClient) { }

  getEmployeurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}