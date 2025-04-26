import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormateurListService {
  private apiUrl = 'http://localhost:8094/formateurs'; // URL du backend

  constructor(private http: HttpClient) { }

  getAllFormateurs() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
