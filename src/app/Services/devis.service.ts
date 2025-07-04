import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
private apiUrl = environment.apiUrl + '/devis';

  constructor(private http: HttpClient) { }

   getAllDevis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getDevisById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}
}
