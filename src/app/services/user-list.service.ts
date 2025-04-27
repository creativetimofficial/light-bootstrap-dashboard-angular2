import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private apiUrl = 'http://localhost:8094/utilisateurs'; // URL du backend

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }
  

  createUser(user: any, roleId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}?roleId=${roleId}`, user);
  }

  updateUser(userId:any ,user: any, roleId: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}?roleId=${roleId}`, user);
  }

    deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
