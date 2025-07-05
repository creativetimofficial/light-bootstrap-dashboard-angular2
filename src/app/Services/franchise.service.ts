import { Injectable } from '@angular/core';
import { Franchise } from 'app/liste-franchises/liste-franchises.component';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {
  private apiUrl = environment.apiUrl + '/franchise';

  constructor(private http: HttpClient) { }

 getFranchises(): Observable<Franchise[]> {
    return this.http.get<Franchise[]>(this.apiUrl);
  }  

  getFranchiseById(id: number): Observable<Franchise> {
  return this.http.get<Franchise>(`${this.apiUrl}/${id}`);
}
envoyerDemandeFranchise(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }
}
