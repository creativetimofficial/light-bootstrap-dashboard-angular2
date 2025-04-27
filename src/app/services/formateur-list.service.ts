import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurListService {
  private apiUrl = 'http://localhost:8094/formateurs'; // URL du backend pour les formateurs

  constructor(private http: HttpClient) { }

  getAllFormateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createFormateur(formateur: any,employeurId: Number): Observable<any> {
    return this.http.post(`${this.apiUrl}?employeurId=${employeurId}`, formateur);  }

  updateFormateur(formateurId: number, formateur: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${formateurId}`, formateur);
    }

  deleteFormateur(formateurId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${formateurId}`);
  }
}
