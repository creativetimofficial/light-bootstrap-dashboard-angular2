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

 addDevis(data :any):Observable<any>
 {
  return this.http.post(`${this.apiUrl}`, data);
 }
  getNumberDevisWithProduit(): Observable<{ devisWithProduit: number }> {
    return this.http.get<{ devisWithProduit: number }>(`${this.apiUrl}/count/IOT`);
  }

  getNumberDevisWithoutProduit(): Observable<{ devisWithoutProduit: number }> {
    return this.http.get<{ devisWithoutProduit: number }>(`${this.apiUrl}/count/IT`);
  }
   updateEtatDevis(id: number, nouvelEtat: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/etat`, { etat: nouvelEtat });
  }

}
