import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private apiUrl = 'http://localhost:8094/utilisateurs'; // URL du backend

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
